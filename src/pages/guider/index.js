import wx from '../../utils/weex';
import Service from '../../utils/service';

Page({
  data: {
    images: [],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  onLoad() {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    wx.app.getSession()
    .then(() => {
      // request EnvUserInfo
      new Service()
      .request({
        url: '/api/common/getUserInfo',
        method: 'POST'
      })
      .then((model) => {
        // 跳转到个人主页
        const role = model.get('role');
        wx.redirectTo({
          url: `pages/user/${wx.app.data.roleMap[role]}/index`
        });
      })
      .catch((reason) => {
        console.log(reason);
        wx.showModal({
          title: '友情提示',
          content: `${reason}`,
          showCancel: false
        });
      });
    })
    .catch(() => {
      this.setData({
        images: [
          'https://gw.alicdn.com/tps/i2/T1eppkFThaXXcbqQZo-320-480.png',
          'https://gw.alicdn.com/tps/i3/T1unFhFFxdXXcbqQZo-320-480.png',
          'https://gw.alicdn.com/tps/i4/T13aBkFJFaXXcbqQZo-320-480.png'
        ]
      });
      setTimeout(() => wx.hideToast(), 3e2);
    });
  },
  // Events
  swiperchange(e) {
    this.setData({
      last: e.detail.current === this.data.images.length - 1
    });
  },
  entry(e) {
    if (!wx.app.data.session) {
      return wx.redirectTo({
        url: '/pages/login/index'
      });
    }
  }
});
