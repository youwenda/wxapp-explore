import promisify from './utils/promisify';

App({
  onLaunch() {
    console.log('onLauch');
  },
  getUserInfo() {
    if (this.data.userInfo) {
      return Promise.resolve(this.data.userInfo);
    }
    return promisify(wx.login)()
    .then(() => promisify(wx.getUserInfo)())
    .then((data) => {
      this.data.userInfo = data.userInfo;
      return Promise.resolve(this.data.userInfo);
    });
  },
  data: {
    userInfo: null
  }
});
