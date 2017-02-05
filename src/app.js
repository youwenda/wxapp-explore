import wx from './utils/weex';

const SESSION = 'session';

App({
  getSession() {
    if (this.data.session) {
      return Promise.resolve(this.data.session);
    }
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: SESSION
      })
      .then((data) => {
        if (data.data != null) {
          this.data.session = data.data;
          resolve(this.data.session);
        } else {
          reject();
        }
      })
      .catch(() => reject());
    });
  },
  getUserInfo() {
    if (this.data.userInfo) {
      return Promise.resolve(this.data.userInfo);
    }

    return wx.login()
    .then(() => wx.getUserInfo())
    .then((data) => {
      this.data.userInfo = data.userInfo;
      return Promise.resolve(this.data.userInfo);
    });
  },
  onLauch() {
    return this.getSession();
  },
  data: {
    session: null,
    userInfo: null,
    roleMap: {
      1: 'patient',
      2: 'doctor'
    }
  }
});
