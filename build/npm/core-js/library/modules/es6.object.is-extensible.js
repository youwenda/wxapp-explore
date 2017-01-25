"use strict";var exports=module.exports={};

// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object.js');

require('./_object-sap.js')('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});