"use strict";var exports=module.exports={};
  

var _getPrototypeOf = require('../../../babel-runtime/core-js/object/get-prototype-of.js');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has.js'),
    toObject = require('./_to-object.js'),
    IE_PROTO = require('./_shared-key.js')('IE_PROTO'),
    ObjectProto = Object.prototype;

module.exports = _getPrototypeOf2.default || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }return O instanceof Object ? ObjectProto : null;
};
  