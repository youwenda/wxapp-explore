"use strict";var exports=module.exports={};
var global = window = {
  Array: Array,
  Date: Date,
  Error: Error,
  Function: Function,
  Math: Math,
  Object: Object,
  RegExp: RegExp,
  String: String,
  TypeError: TypeError,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval
};

var _weex = require('../../utils/weex.js');

var _weex2 = _interopRequireDefault(_weex);

var _service = require('../../utils/service.js');

var _service2 = _interopRequireDefault(_service);

var _index = require('../../components/validation/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../components/input/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// index.js
// 获取应用实例
var EMPTY = '';
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
        required: [true, '请输入验证码']
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
  onUnload: function onUnload() {
    this.valid = null;
  },
  formSubmit: function formSubmit(event) {
    if (!this.valid.isValid(event)) {
      var error = this.valid.errors[0];
      return _weex2.default.showModal({
        title: '友情提示',
        content: '' + error.msg,
        showCancel: false
      });
    }
    _weex2.default.showToast({
      title: '加载中',
      icon: 'loading'
    });
    _weex2.default.request({
      url: _service2.default.adapterUrl('/api/doctor/login'),
      data: {
        contact_mobile: event.detail.value.phone,
        vcode: event.detail.value.vcode
        // 暂时看不需要微信login code
      },
      method: 'POST'
    }).then(function (data) {
      // 设置Session，页面跳转到协议页面
      /* eslint no-param-reassign:0 */
      data = data.data;
      var session = data.result.session;
      var role = _weex2.default.app.data.roleMap[data.result.role];
      // 存储在App global Data中 以及在storage中
      _weex2.default.app.data.session = session;
      _weex2.default.setStorage({
        key: 'session',
        data: session
      }).then(function () {
        _weex2.default.showToast({
          title: role ? '登陆成功' : '新用户注册成功',
          icon: 'loading'
        });
        if (role) {
          return _weex2.default.redirectTo({
            url: '/pages/user/' + role + '/index'
          });
        }
        return _weex2.default.redirectTo({
          url: '/pages/login/protocol'
        });
      });
    }).catch(function (err) {
      _weex2.default.showModal({
        title: '友情提示',
        content: '\u767B\u5F55\u5931\u8D25\uFF0C\u9519\u8BEF\u539F\u56E0\uFF1A' + err,
        showCancel: false
      });
    });
  }
}, _index4.default);

Page(options);