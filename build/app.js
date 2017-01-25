"use strict";var exports=module.exports={};


var _promise = require('./npm/babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

var _weex = require('./utils/weex.js');

var _weex2 = _interopRequireDefault(_weex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

App({
  onLaunch: function onLaunch() {
    console.log('onLauch');
  },
  getUserInfo: function getUserInfo() {
    var _this = this;

    if (this.data.userInfo) {
      return _promise2.default.resolve(this.data.userInfo);
    }

    return _weex2.default.login().then(function () {
      return _weex2.default.getUserInfo();
    }).then(function (data) {
      _this.data.userInfo = data.userInfo;
      return _promise2.default.resolve(_this.data.userInfo);
    });
  },

  data: {
    userInfo: null
  }
});