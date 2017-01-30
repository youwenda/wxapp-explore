"use strict";var exports=module.exports={};


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('../npm/babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('../npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EMPTY = '';
var toString = Object.prototype.toString;

var Model = function () {
  /**
   * 方便的数据获取属性方法
   */
  function Model() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Model);

    this.$ = data;
  }
  /**
   * 获取数据属性
   */


  (0, _createClass3.default)(Model, [{
    key: 'get',
    value: function get(key, dValue, udfd) {
      var alen = arguments.length;
      var hasDValue = alen >= 2;
      var $attrs = this.$;
      var attrs = $attrs;

      if (alen) {
        var tks = Array.isArray(key) ? [].slice.call(key) : (key + EMPTY).split('.');
        var tk = tks.shift();

        while (tk && attrs) {
          attrs = attrs[tk];
          tk = tks.shift();
        }

        if (tk) {
          attrs = udfd;
        }
      }
      if (hasDValue && toString.call(dValue) !== toString.call(attrs)) {
        attrs = dValue;
      }
      return attrs;
    }
    /**
     * 设置数据属性
     */

  }, {
    key: 'set',
    value: function set(key, val) {
      if (toString.call(key) === '[object Object]') {
        (0, _assign2.default)(this.$, key);
      } else {
        this.$[key] = val;
      }
    }
  }]);
  return Model;
}();

exports.default = Model;