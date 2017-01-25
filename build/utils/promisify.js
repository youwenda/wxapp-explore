"use strict";var exports=module.exports={};


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('../npm/babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('../npm/babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

exports.default = promisify;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function promisify(fn) {
  return function promisifyWrapper() {
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
      fn(options);
    });
  };
}