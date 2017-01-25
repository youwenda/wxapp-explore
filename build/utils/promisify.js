"use strict";var exports=module.exports={};


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('../npm/babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

exports.default = promisify;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function promisify(fn) {
  return function promisifyWrapper() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new _promise2.default(function (resolve, reject) {
      // Object.assign(options, {
      //   success(...args) {
      //     resolve(...args);
      //   },
      //   fail(err) {
      //     if (err && err.errMsg) {
      //       reject(new Error(err.errMsg));
      //     } else {
      //       reject(err);
      //     }
      //   }
      // });
      options.success = function () {
        resolve.apply(undefined, arguments);
      };
      options.fail = function (err) {
        if (err && err.errMsg) {
          reject(new Error(err.errMsg));
        } else {
          reject(err);
        }
      };
      fn(options);
    });
  };
}