const EMPTY = '';
const toString = Object.prototype.toString;

class Model {
  /**
   * 方便的数据获取属性方法
   */
  constructor(data = {}) {
    this.$ = data;
  }
  /**
   * 获取数据属性
   */
  get(key, dValue, udfd) {
    const alen = arguments.length;
    const hasDValue = alen >= 2;
    const $attrs = this.$;
    let attrs = $attrs;

    if (alen) {
      const tks = Array.isArray(key) ? [].slice.call(key) : (key + EMPTY).split('.');
      let tk = tks.shift();

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
  set(key, val) {
    if (toString.call(key) === '[object Object]') {
      Object.assign(this.$, key);
    } else {
      this.$[key] = val;
    }
  }
}

export default Model;
