"use strict";var exports=module.exports={};


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('../../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('../../npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

var _rule = require('./rule.js');

var _rule2 = _interopRequireDefault(_rule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Validation = function () {
  /**
   * Creates an instance of Validation.
   * @param {object} [fields={}]
   * @param {object} [rule={}] 自定义规则
   * @param {boolean} [single=true]
   *
   * @memberOf Validation
   */
  function Validation() {
    var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var rule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var single = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    (0, _classCallCheck3.default)(this, Validation);

    this.field = field;
    this.rule = new _rule2.default(rule);
    this.single = single;
    this.errors = [];
  }

  (0, _createClass3.default)(Validation, [{
    key: 'checkField',
    value: function checkField(field, rule, event) {
      var data = event.detail.value || {};
      var value = data[field] || '';
      var k = void 0;
      var v = void 0;
      var fn = void 0;
      /* eslint no-restricted-syntax: 0 */
      for (k in rule) {
        if (Object.prototype.hasOwnProperty.call(rule, k)) {
          v = rule[k];
          fn = this.rule.get(k, v);
          if (fn) {
            fn = fn(value);
            if (!_util2.default.isEmpty(fn)) {
              return this.errors.push({
                field: field,
                rule: v,
                msg: fn
              });
            }
          }
        }
      }
      return null;
    }
    /**
     * 验证所有字段的规则，返回验证是否通过
     * @param {Object} event 表单数据对象
     */

  }, {
    key: 'isValid',
    value: function isValid(event) {
      this.errors.length = 0;
      for (var field in this.field) {
        if (Object.prototype.hasOwnProperty.call(this.field, field)) {
          this.checkField(field, this.field[field], event);
          if (this.single && this.errors.length) {
            break;
          }
        }
      }
      return !this.errors.length;
    }
  }]);
  return Validation;
}();

exports.default = Validation;