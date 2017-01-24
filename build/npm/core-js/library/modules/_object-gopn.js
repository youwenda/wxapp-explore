"use strict";var exports=module.exports={};
  

var _getOwnPropertyNames = require('../../../babel-runtime/core-js/object/get-own-property-names.js');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal.js'),
    hiddenKeys = require('./_enum-bug-keys.js').concat('length', 'prototype');

exports.f = _getOwnPropertyNames2.default || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};
  