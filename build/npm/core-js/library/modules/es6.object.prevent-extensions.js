"use strict";var exports=module.exports={};
  

// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object.js'),
    meta = require('./_meta.js').onFreeze;

require('./_object-sap.js')('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});
  