"use strict";var exports=module.exports={};


var _promise = require('./npm/babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

var _weex = require('./utils/weex.js');

var _weex2 = _interopRequireDefault(_weex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SESSION = 'session';

App({
  getSession: function getSession() {
    var _this = this;

    if (this.data.session) {
      return _promise2.default.resolve(this.data.session);
    }
    return new _promise2.default(function (resolve, reject) {
      _weex2.default.getStorage({
        key: SESSION
      }).then(function (data) {
        if (data.data != null) {
          _this.data.session = data.data;
          resolve(_this.data.session);
        } else {
          reject();
        }
      }).catch(function () {
        return reject();
      });
    });
  },
  getUserInfo: function getUserInfo() {
    var _this2 = this;

    if (this.data.userInfo) {
      return _promise2.default.resolve(this.data.userInfo);
    }

    return _weex2.default.login().then(function () {
      return _weex2.default.getUserInfo();
    }).then(function (data) {
      _this2.data.userInfo = data.userInfo;
      return _promise2.default.resolve(_this2.data.userInfo);
    });
  },
  onLauch: function onLauch() {
    return this.getSession();
  },

  data: {
    session: null,
    userInfo: null,
    roleMap: {
      1: 'patient',
      2: 'doctor'
    }
  }
});