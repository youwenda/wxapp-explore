"use strict";var exports=module.exports={};


var _weex = require('../../utils/weex.js');

var _weex2 = _interopRequireDefault(_weex);

var _service = require('../../utils/service.js');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Page({
  data: {
    images: [],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  onLoad: function onLoad() {
    var _this = this;

    _weex2.default.showToast({
      title: '加载中',
      icon: 'loading'
    });
    _weex2.default.app.getSession().then(function () {
      // request EnvUserInfo
      new _service2.default().request({
        url: '/api/common/getUserInfo',
        method: 'POST'
      }).then(function (model) {
        // 跳转到个人主页
        var role = model.get('role');
        _weex2.default.redirectTo({
          url: '/pages/user/' + _weex2.default.app.data.roleMap[role] + '/index'
        });
      }).catch(function (reason) {
        console.log(reason);
        _weex2.default.showModal({
          title: '友情提示',
          content: '' + reason,
          showCancel: false
        });
      });
    }).catch(function () {
      _this.setData({
        images: ['https://gw.alicdn.com/tps/i2/T1eppkFThaXXcbqQZo-320-480.png', 'https://gw.alicdn.com/tps/i3/T1unFhFFxdXXcbqQZo-320-480.png', 'https://gw.alicdn.com/tps/i4/T13aBkFJFaXXcbqQZo-320-480.png']
      });
      setTimeout(function () {
        return _weex2.default.hideToast();
      }, 3e2);
    });
  },

  // Events
  swiperchange: function swiperchange(e) {
    this.setData({
      last: e.detail.current === this.data.images.length - 1
    });
  },
  entry: function entry(e) {
    if (!_weex2.default.app.data.session) {
      return _weex2.default.redirectTo({
        url: '/pages/login/index'
      });
    }
  }
});