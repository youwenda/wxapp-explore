import Util from './util';
import Rule from './rule';

class Validation {
  /**
   * Creates an instance of Validation.
   * @param {object} [fields={}]
   * @param {object} [rule={}] 自定义规则
   * @param {boolean} [single=true]
   *
   * @memberOf Validation
   */
  constructor(field = {}, rule = {}, single = true) {
    this.field = field;
    this.rule = new Rule(rule);
    this.single = single;
    this.errors = [];
  }
  checkField(field, rule, event) {
    const data = event.detail.value || {};
    const value = data[field] || '';
    let k;
    let v;
    let fn;
    /* eslint no-restricted-syntax: 0 */
    for (k in rule) {
      if (Object.prototype.hasOwnProperty.call(rule, k)) {
        v = rule[k];
        fn = this.rule.get(k, v);
        if (fn) {
          fn = fn(value);
          if (!Util.isEmpty(fn)) {
            return this.errors.push({
              field,
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
  isValid(event) {
    this.errors.length = 0;
    for (const field in this.field) {
      if (Object.prototype.hasOwnProperty.call(this.field, field)) {
        this.checkField(field, this.field[field], event);
        if (this.single && this.errors.length) {
          break;
        }
      }
    }
    return !this.errors.length;
  }
}

export default Validation;
