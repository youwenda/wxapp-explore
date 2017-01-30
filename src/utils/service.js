import wx from './weex';
import Event from './event';
import Model from './model';

const HOST = 'https://healcloud.cn';
const HTTPS_REG = /^https?\/\//;
const SUFFIX = '.json';
const SUFFIX_REG = /\.json$/;
const EMPTY = '';
const CACHED = {};
const CODE = {
  success: 200,
  login: 403,
  unfound: 404,
  networkerror: 0
};
let COUNTER = 0;

class Service {
  constructor() {
    /* eslint no-plusplus:0 */
    this.id = COUNTER++;
    this.destroyed = 0;
  }
  static adapterUrl(url) {
    /* eslint no-param-reassign: 0 */
    HTTPS_REG.lastIndex = 0;
    SUFFIX_REG.lastIndex = 0;
    if (!HTTPS_REG.test(url)) {
      url = url.slice(0, 1) === '/' ? `${HOST}${url}` : `${HOST}/${url}`;
    }
    if (!SUFFIX_REG.test(url)) {
      url = `${url}${SUFFIX}`;
    }
    return url;
  }
  // 异步操作中避免重复性操作，进一步提升性能
  static getCached(options = {}) {
    let key;
    if (typeof options.url === 'string') {
      options.url = Service.adapterUrl(options.url);
      key = `$${options.url}`;
    } else if (typeof options.fn === 'function') {
      key = `$${options.fn + EMPTY}`;
    }

    const cKey = `...${key}`;

    return new Promise((resolve, reject) => {
      if (CACHED[key]) {
        return resolve(CACHED[key]);
      }
      // TODO Listen on
      Event.on(key, (res) => {
        if (res.err) {
          return reject(res.err);
        }
        return resolve(res.data);
      });

      if (!CACHED[cKey]) {
        CACHED[cKey] = 1;
        if (options.url) {
          wx.request(options)
          .then((data) => {
            delete CACHED[cKey];
            Event.fire(key, {
              err: null,
              data
            }, true);
          })
          .catch((err) => {
            delete CACHED[cKey];
            Event.fire(key, {
              err: err || '接口错误'
            }, true);
          });
        } else {
          options.fn.call(options.context)
          .then((data) => {
            delete CACHED[cKey];
            Event.fire(key, {
              err: null,
              data
            }, true);
          })
          .catch((err) => {
            delete CACHED[cKey];
            Event.fire(key, {
              err: err || '接口错误'
            }, true);
          });
        }
      }
    });
  }
  static request(options = {}) {
    if (!options.url) {
      throw new Error('wx.request方法需要参数url，详情请见https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html#wxrequestobject');
    }
    Object.assign(options, {
      url: Service.adapterUrl(options.url)
    });
    return new Promise((resolve, reject) => {
      Service.getCached({
        fn: wx.app.getSession,
        context: wx.app
      })
      .then((session) => {
        Object.assign(options.data || {}, {
          session
        });
        return wx.request(options)
        .then((res) => {
          if (res.code === CODE.success) {
            const data = res.result || res.data;
            const msg = res.msg || res.message;
            if (msg && msg.length) {
              data.msg = msg;
            }
            return resolve(new Model(data));
          } else if (res.code === CODE.login) {
            wx.redirectTo({
              url: '/pages/login/index'
            });
            return reject(res.msg || 'Need Login');
          }
          reject(res.msg || '接口错误');
        })
        .catch((err) => {
          reject(err);
        });
      })
      .catch(() => {
        // 没有session直接跳转到登录页面
        wx.redirectTo({
          url: '/pages/login/index'
        });
        return reject('Need Login');
        // Service.getCached({
        //   fn: wx.login,
        //   context: wx
        // })
        // .then((res) => {
        //   return wx.request({
        //     url: ,
        //     data: {
        //       code: res.code
        //     }
        //   })
        // })
        // .catch(() => {
        //   // TODO 跳转到登录授权页面
        // });
      });
    });
  }
}

export default Service;
