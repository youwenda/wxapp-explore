"use strict";var exports=module.exports={};


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _weex = require('../../utils/weex.js');

var _weex2 = _interopRequireDefault(_weex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Util = {
  logout: function logout() {
    _weex2.default.app.data.session = null;
    _weex2.default.removeStorageSync('session');
    _weex2.default.redirectTo({
      url: '/pages/login/index'
    });
  }
};

exports.default = Util;