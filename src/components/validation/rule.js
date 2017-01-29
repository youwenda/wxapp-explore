import Util from './util';

class Rule {
  constructor(rule = {}) {
    this.init(rule);
  }
  /**
   * 初始化生成规则
   * @param {Object} merged rule
   */
  init(rule) {
    /* eslint consistent-return: 0 */
    const RuleMap = {
      required: {
        text: '此项为必填项。',
        fn(value, text, is) {
          if (Array.isArray(value) && value.length === 0) {
            return text;
          }
          if (Util.isEmpty(value) && is) {
            return text;
          }
        }
      },
      regex: {
        text: '校验失败。',
        fn(value, text, reg) {
          if (!new RegExp(reg).test(value)) {
            return text;
          }
        }
      },
      length: {
        text: '字符长度不能小于{0},且不能大于{1}。',
        fn(value, text, minLen, maxLen, realLength) {
          const len = Util.getStrLen(value, realLength);
          const minl = Util.toNumber(minLen);
          const maxl = Util.toNumber(maxLen);
          if (len < minl || len > maxl) {
            return text;
          }
        }
      },
      maxLength: {
        text: '字符长度不能超过{0}。',
        fn(value, text, maxLen, realLength) {
          const len = Util.getStrLen(value, realLength);
          const maxl = Util.toNumber(maxLen);
          if (len > maxl) {
            return Util.format(text, maxLen);
          }
        }
      },
      range: {
        text: '只能在{0}至{1}之间。',
        fn(value, text, min, max) {
          /* eslint no-param-reassign: 0*/
          min = Util.toNumber(min);
          max = Util.toNumber(max);
          if (value < min || value > max) {
            return Util.format(text, min, max);
          }
        }
      },
      mobile: {
        text: '手机号码不合法',
        fn(value, text) {
          // 规则取自淘宝注册登录模块 @author:yanmu.wj@taobao.com
          const regex = {
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
          let flag = false;
          /* eslint no-restricted-syntax: 0 */
          for (const k in regex) {
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

    [
      ['number', /^(-?\d+)(\.\d+)?$/, '只能输入数字'],
      ['chinese', /^[\u0391-\uFFE5]+$/, '只能输入中文'],
      ['english', /^[A-Za-z]+$/, '只能输入英文字母'],
      ['currency', /^\d+(\.\d+)?$/, '金额格式不正确。'],
      ['phone', /^((\(\d{2,3}\))|(\d{3}-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(-\d{1,4})?$/, '电话号码格式不正确。'],
      ['url', /^(https?:)\/\/[a-z\d]+(?:-*[a-z\d]+)*\.[a-z\d]+(?:-[a-z\d]+)*[^<>""]*$/i, 'url格式不正确。'],
      ['email', /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, '请输入正确的email格式']
    ].forEach((item) => {
      RuleMap[item[0]] = {
        text: item[2],
        fn(value, text) {
          if (!new RegExp(item[1]).test(value)) {
            return text;
          }
        }
      };
    });
    this.rule = Object.assign(RuleMap, rule);
  }
  /**
   * 增加规则
   * @param {String} name 规则名
   * @param {String} text 提示信息
   * @param {Function} fn 校验函数
   */
  add(name, text, fn) {
    if (typeof fn === 'function') {
      this.rule[name] = {
        text,
        fn
      };
    }
  }
  /**
   * 移除规则
   * @param  {String} name 规则名称
   */
  remove(name) {
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
  get(name, param) {
    const r = this.rule[name];
    if (!r) {
      return null;
    }

    const fn = r.fn;
    const text = r.text;
    const argLen = fn.length - 1;
    let arg = [];

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
}

export default Rule;


