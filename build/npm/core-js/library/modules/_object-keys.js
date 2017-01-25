"use strict";var exports=module.exports={};

var _keys = require('../../../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal.js'),
    enumBugKeys = require('./_enum-bug-keys.js');

module.exports = _keys2.default || function keys(O) {
  return $keys(O, enumBugKeys);
};