"use strict";var exports=module.exports={};

var _defineProperty = require('../../../babel-runtime/core-js/object/define-property.js');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var anObject = require('./_an-object.js'),
    IE8_DOM_DEFINE = require('./_ie8-dom-define.js'),
    toPrimitive = require('./_to-primitive.js'),
    dP = _defineProperty2.default;

exports.f = require('./_descriptors.js') ? _defineProperty2.default : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};