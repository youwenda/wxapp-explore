"use strict";var exports=module.exports={};


var _weex = require('../../utils/weex.js');

var _weex2 = _interopRequireDefault(_weex);

var _index = require('../../components/validation/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// index.js
// 获取应用实例
var EMPTY = '';

Page({
  data: {
    phone: EMPTY,
    vcode: EMPTY,
    inputVal: EMPTY,
    userInfo: {}
  },
  clearInput: function clearInput() {
    console.log('clearInput');
    this.setData({
      inputVal: EMPTY
    });
  },
  inputTyping: function inputTyping(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onLoad: function onLoad() {
    var _this = this;

    this.valid = new _index2.default({
      phone: {
        required: [true, '请输入手机号码'],
        mobile: true
      },
      vcode: {
        required: [true, '请输入验证码'],
        regex: /\d{4,5}/
      }
    });
    // 调用应用实例的方法获取全局数据
    return _weex2.default.app.getUserInfo().then(function (userInfo) {
      console.log('getUserInfo Promise', userInfo);
      _this.setData({
        userInfo: userInfo
      });
    }).catch(function (reason) {
      console.log(reason);
    });
  },
  bindfocus: function bindfocus(event) {
    console.log('bindfocus', event);
  },
  formSubmit: function formSubmit(event) {
    console.log('formSubmit', event);
    console.log(this.valid.isValid(event), this.valid.errors);
    var error = this.valid.errors[0];
    _weex2.default.showModal({
      title: '友情提示',
      content: '' + error.msg,
      showCancel: !1
    });
  }
});