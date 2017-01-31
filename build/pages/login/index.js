"use strict";var exports=module.exports={};


var _weex = require('../../utils/weex.js');

var _weex2 = _interopRequireDefault(_weex);

var _index = require('../../components/validation/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../components/input/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EMPTY = ''; // index.js
// 获取应用实例

var options = (0, _weex.mergeOptions)({
  data: {
    userInfo: {}
  },
  onLoad: function onLoad() {
    var _this = this;

    console.log('login onLoad');
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
  onReady: function onReady() {
    console.log('login onReady');
  },
  formSubmit: function formSubmit(event) {
    if (!this.valid.isValid(event)) {
      var error = this.valid.errors[0];
      _weex2.default.showModal({
        title: '友情提示',
        content: '' + error.msg,
        showCancel: !1
      });
    }
  }
}, _index4.default);

Page(options);