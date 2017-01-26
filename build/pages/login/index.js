"use strict";var exports=module.exports={};


var _weex = require('../../utils/weex.js');

var _weex2 = _interopRequireDefault(_weex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EMPTY = ''; // index.js
// 获取应用实例


Page({
  data: {
    phone: EMPTY,
    vcode: EMPTY,
    userInfo: {}
  },
  onLoad: function onLoad() {
    var _this = this;

    // 调用应用实例的方法获取全局数据
    return _weex2.default.app.getUserInfo().then(function (userInfo) {
      console.log('getUserInfo Promise', userInfo);
      _this.setData({
        userInfo: userInfo
      });
    }).catch(function (reason) {
      console.log(reason);
    });
  }
});