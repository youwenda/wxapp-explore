import wx from '../../utils/weex';

const Util = {
  logout() {
    wx.app.data.session = null;
    wx.removeStorageSync('session');
    wx.redirectTo({
      url: '/pages/login/index'
    });
  }
};

export default Util;
