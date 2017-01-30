"use strict";var exports=module.exports={};


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 多播事件对象
 * @name Event
 * @namespace
 */
/* eslint no-param-reassign: 0*/
var G_SPLITER = '\x1F';
var Event = {
  /**
   * @lends Event
   */
  /**
   * 触发事件
   * @param {String} name 事件名称
   * @param {Object} data 事件对象
   * @param {Boolean} remove 事件触发完成后是否移除这个事件的所有监听
   * @param {Boolean} lastToFirst 是否从后向前触发事件的监听列表
   */
  fire: function fire(name, data, remove, lastToFirst) {
    var key = G_SPLITER + name;
    var me = this;
    var list = me[key];
    var end = void 0;
    var len = void 0;
    var idx = void 0;
    var t = void 0;

    if (!data) data = {};
    if (!data.type) data.type = name;
    if (list) {
      end = list.length;
      len = end - 1;
      while (end--) {
        idx = lastToFirst ? end : len - end;
        t = list[idx];
        if (t.d) {
          list.splice(idx, 1);
          len--;
        } else {
          t.f.call(me, data);
        }
      }
    }
    if (remove) me.detach(name);
    return me;
  },

  /**
   * 绑定事件
   * @param {String} name 事件名称
   * @param {Function} fn 事件回调
    */
  on: function on(name, fn) {
    var me = this;
    var key = G_SPLITER + name;
    var list = me[key] || (me[key] = []);
    list.push({
      f: fn
    });
    return me;
  },

  /**
   * 解除事件绑定
   * @param {String} name 事件名称
   * @param {Function} fn 事件回调
   * @TODO 增加清除所有事件的处理逻辑
   */
  off: function off(name, fn) {
    var key = G_SPLITER + name;
    var me = this;
    var list = me[key];
    var l = arguments.length;

    var i = void 0;
    var t = void 0;

    if (!l) {
      /* eslint no-restricted-syntax: 0 */
      for (var k in me) {
        if (Object.prototype.hasOwnProperty.call(me, k) && !k.indexOf(G_SPLITER)) {
          delete me[key];
        }
      }
    } else if (fn) {
      if (list) {
        i = list.length;
        while (i--) {
          t = list[i];
          if (t.f === fn && !t.d) {
            t.d = 1;
            break;
          }
        }
      }
    } else {
      delete me[key];
    }
    return me;
  }
};

exports.default = Event;