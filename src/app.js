import wx from './utils/weex';

App({
  onLaunch() {
    console.log('onLauch');
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
  data: {
    userInfo: null
  }
});
