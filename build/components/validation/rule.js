"use strict";var exports=module.exports={};


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('../../npm/babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('../../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('../../npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Rule = function () {
  function Rule() {
    var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Rule);

    this.init(rule);
  }
  /**
   * 初始化生成规则
   * @param {Object} merged rule
   */


  (0, _createClass3.default)(Rule, [{
    key: 'init',
    value: function init(rule) {
      /* eslint consistent-return: 0 */
      var RuleMap = {
        required: {
          text: '此项为必填项。',
          fn: function fn(value, text, is) {
            if (Array.isArray(value) && value.length === 0) {
              return text;
            }
            if (_util2.default.isEmpty(value) && is) {
              return text;
            }
          }
        },
        regex: {
          text: '校验失败。',
          fn: function fn(value, text, reg) {
            if (!new RegExp(reg).test(value)) {
              return text;
            }
          }
        },
        length: {
          text: '字符长度不能小于{0},且不能大于{1}。',
          fn: function fn(value, text, minLen, maxLen, realLength) {
            var len = _util2.default.getStrLen(value, realLength);
            var minl = _util2.default.toNumber(minLen);
            var maxl = _util2.default.toNumber(maxLen);
            if (len < minl || len > maxl) {
              return text;
            }
          }
        },
        maxLength: {
          text: '字符长度不能超过{0}。',
          fn: function fn(value, text, maxLen, realLength) {
            var len = _util2.default.getStrLen(value, realLength);
            var maxl = _util2.default.toNumber(maxLen);
            if (len > maxl) {
              return _util2.default.format(text, maxLen);
            }
          }
        },
        range: {
          text: '只能在{0}至{1}之间。',
          fn: function fn(value, text, min, max) {
            /* eslint no-param-reassign: 0*/
            min = _util2.default.toNumber(min);
            max = _util2.default.toNumber(max);
            if (value < min || value > max) {
              return _util2.default.format(text, min, max);
            }
          }
        },
        mobile: {
          text: '手机号码不合法',
          fn: function fn(value, text) {
            // 规则取自淘宝注册登录模块 @author:yanmu.wj@taobao.com
            var regex = {
              // 中国移动
              cm: /^(?:0?1)((?:3[56789]|5[0124789]|8[278])\d|34[0-8]|47\d)\d{7}$/,
              // 中国联通
              cu: /^(?:0?1)(?:3[012]|4[5]|5[356]|8[356]\d|349)\d{7}$/,
              // 中国电信
              ce: /^(?:0?1)(?:33|53|8[079])\d{8}$/,
              // 中国大陆
              cn: /^(?:0?1)[3458]\d{9}$/,
              // 中国香港
              hk: /^(?:0?[1569])(?:\d{7}|\d{8}|\d{12})$/,
              // 澳门
              macao: /^6\d{7}$/,
              // 台湾
              tw: /^(?:0?[679])(?:\d{7}|\d{8}|\d{10})$/
            };
            var flag = false;
            /* eslint no-restricted-syntax: 0 */
            for (var k in regex) {
              if (Object.prototype.hasOwnProperty.call(regex, k)) {
                if (value.match(regex[k])) {
                  flag = true;
                  break;
                }
              }
            }

            if (!flag) {
              return text;
            }
          }
        }
      };

      [['number', /^(-?\d+)(\.\d+)?$/, '只能输入数字'], ['chinese', /^[\u0391-\uFFE5]+$/, '只能输入中文'], ['english', /^[A-Za-z]+$/, '只能输入英文字母'], ['currency', /^\d+(\.\d+)?$/, '金额格式不正确。'], ['phone', /^((\(\d{2,3}\))|(\d{3}-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(-\d{1,4})?$/, '电话号码格式不正确。'], ['url', /^(https?:)\/\/[a-z\d]+(?:-*[a-z\d]+)*\.[a-z\d]+(?:-[a-z\d]+)*[^<>""]*$/i, 'url格式不正确。'], ['email', /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, '请输入正确的email格式']].forEach(function (item) {
        RuleMap[item[0]] = {
          text: item[2],
          fn: function fn(value, text) {
            if (!new RegExp(item[1]).test(value)) {
              return text;
            }
          }
        };
      });
      this.rule = (0, _assign2.default)(RuleMap, rule);
    }
    /**
     * 增加规则
     * @param {String} name 规则名
     * @param {String} text 提示信息
     * @param {Function} fn 校验函数
     */

  }, {
    key: 'add',
    value: function add(name, text, fn) {
      if (typeof fn === 'function') {
        this.rule[name] = {
          text: text,
          fn: fn
        };
      }
    }
    /**
     * 移除规则
     * @param  {String} name 规则名称
     */

  }, {
    key: 'remove',
    value: function remove(name) {
      delete this.rule[name];
    }
    /**
     * 获取校验规则
     * @param  {[type]} name  [规则名称]
     * @param  {[type]} param [规则参数, 参数为在html页面中输入指定的规则]
     *
     * @example
     * <input type="text" data-valid="{required:[true, "此项为必填项"]}"/>
     * -->
     * name: "required",
     * param: [true, "此项为必填项"]
     */

  }, {
    key: 'get',
    value: function get(name, param) {
      var r = this.rule[name];
      if (!r) {
        return null;
      }

      var fn = r.fn;
      var text = r.text;
      var argLen = fn.length - 1;
      var arg = [];

      /**
       * 前台调用传参: [param1,param2..text]
       * rule定义为: function(value,text,param1,param2..)
       * 因此需要格式化参数 [[参数],提示信息]
       */

      if (!param) {
        arg = [text];
      } else if (Array.isArray(param)) {
        if (param.length >= argLen) {
          arg.push(param[param.length - 1]);
          arg = arg.concat(param.slice(0, -1));
        } else {
          arg.push(text);
          arg = arg.concat(param);
        }
      } else if (argLen > 0) {
        arg.push(text);
        arg.push(param);
      } else {
        arg.push(text);
      }

      // 返回函数
      return function get(value) {
        return fn.apply(this, [value].concat(arg));
      };
    }
  }]);
  return Rule;
}();

exports.default = Rule;