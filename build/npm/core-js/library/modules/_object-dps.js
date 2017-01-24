"use strict";var exports=module.exports={};
  

var _defineProperties = require('../../../babel-runtime/core-js/object/define-properties.js');

var _defineProperties2 = _interopRequireDefault(_defineProperties);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dP = require('./_object-dp.js'),
    anObject = require('./_an-object.js'),
    getKeys = require('./_object-keys.js');

module.exports = require('./_descriptors.js') ? _defineProperties2.default : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties),
      length = keys.length,
      i = 0,
      P;
  while (length > i) {
    dP.f(O, P = keys[i++], Properties[P]);
  }return O;
};
  