"use strict";var exports=module.exports={};
// 19.1.2.1 Object.assign(target, source, ...)

var _keys = require('../../../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _symbol = require('../../../babel-runtime/core-js/symbol.js');

var _symbol2 = _interopRequireDefault(_symbol);

var _assign = require('../../../babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getKeys = require('./_object-keys.js'),
    gOPS = require('./_object-gops.js'),
    pIE = require('./_object-pie.js'),
    toObject = require('./_to-object.js'),
    IObject = require('./_iobject.js'),
    $assign = _assign2.default;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails.js')(function () {
  var A = {},
      B = {},
      S = (0, _symbol2.default)(),
      K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || (0, _keys2.default)($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = toObject(target),
      aLen = arguments.length,
      index = 1,
      getSymbols = gOPS.f,
      isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]),
        keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
        length = keys.length,
        j = 0,
        key;
    while (length > j) {
      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }
  }return T;
} : $assign;