const EMPTY = '';
const Util = {
  config: {
    required: [true, '此项为必填项']
  },
  /**
   * 字段校验状态枚举
   * error 错误
   * ok 正确
   * hint 提示
   * ignore 忽略
   */
  symbol: {
    error: 0,
    ok: 1,
    hint: 2,
    ignore: 3
  },

  /**
   * 转化为JSON对象
   * @param {Object} str
   * @return {Object}
   */
  toJSON(s) {
    let r = {};
    if (s) {
      try {
        /* eslint no-new-func: 0 */
        r = (new Function(`return ${s}`))();
      } catch (ex) {
        /* eslint no-empty: 0 */
      }
    }
    return r;
  },

  /**
   * 判断是否为空字符串
   * @param {Object} v
   * @return {Boolean}
   */
  isEmpty(v) {
    return v === null || v === undefined || v === EMPTY;
  },

  /**
   * 格式化参数
   * @param {Object} str 要格式化的字符串
   * @return {String}
   */
  format(str, ...args) {
    // format("金额必须在{0}至{1}之间",80,100); //result:"金额必须在80至100之间"
    return str.replace(/\{(\d+)\}/g, (m, i) => args[i]);
  },

  /**
   * 转换成数字
   * @param {Object} n
   * @return {number}
   */
  toNumber(n) {
    /* eslint no-param-reassign: 0 */
    n += EMPTY;
    n = n.indexOf('.') > -1 ? parseFloat(n) : parseInt(n, 10);
    return isNaN(n) ? 0 : n;
  },

  /**
   * 获取字符串的长度
   * @example getStrLen('a啊',true); //结果为3
   * @param {Object} str
   * @param {Object} realLength
   * @return {number}
   */
  getStrLen(str, realLength) {
    /* eslint no-control-regex: 0*/
    return realLength ? str.replace(/[^\x00-\xFF]/g, '**').length : str.length;
  }
};

export default Util;
