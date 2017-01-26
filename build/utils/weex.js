"use strict";var exports=module.exports={};


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('../npm/babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('../npm/babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('../npm/babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 特别指定的wx对象中不进行Promise封装的方法
var noPromiseMethods = {
  clearStorage: 1,
  hideToast: 1,
  showNavigationBarLoading: 1,
  hideNavigationBarLoading: 1,
  drawCanvas: 1,
  canvasToTempFilePath: 1,
  hideKeyboard: 1
};

/* globals wx, getApp, getCurrentPages */
var weex = {
  // 原始wx对象
  wx: wx,
  // getApp() 优雅的封装
  get app() {
    return getApp();
  },

  // getCurrentPages() 优雅的封装
  get currentPages() {
    return getCurrentPages();
  }
};

(0, _keys2.default)(wx).forEach(function (key) {
  if (noPromiseMethods[key] // 特别指定的方法
  || /^(on|create|stop|pause|close)/.test(key) // 以on* create* stop* pause* close* 开头的方法
  || /\w+Sync$/.test(key) // 以Sync结尾的方法
  ) {
      // 不进行Promise封装
      weex[key] = function () {
        var _wx;

        return (_wx = wx)[key].apply(_wx, arguments);
      };
      return;
    }

  // 其余方法自动Promise化
  weex[key] = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new _promise2.default(function (resolve, reject) {
      (0, _assign2.default)(options, {
        success: function success() {
          resolve.apply(undefined, arguments);
        },
        fail: function fail(err) {
          if (err && err.errMsg) {
            reject(new Error(err.errMsg));
          } else {
            reject(err);
          }
        }
      });
      wx[key](options);
    });
  };
});

exports.default = weex;