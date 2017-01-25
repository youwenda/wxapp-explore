"use strict";var exports=module.exports={};


var _promise = require('./npm/babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

var _promisify = require('./utils/promisify.js');

var _promisify2 = _interopRequireDefault(_promisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

App({
  onLauch: function onLauch() {
    console.log('onLauch');
  },
  getUserInfo: function getUserInfo() {
    var _this = this;

    if (this.data.userInfo) {
      return _promise2.default.resolve(this.data.userInfo);
    }
    return (0, _promisify2.default)(wx.login)().then(function () {
      return (0, _promisify2.default)(wx.getUserInfo)();
    }).then(function (data) {
      _this.data.userInfo = data.userInfo;
      return _promise2.default.resolve(_this.data.userInfo);
    });
  },

  data: {
    userInfo: null
  }
});