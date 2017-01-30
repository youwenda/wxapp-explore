"use strict";var exports=module.exports={};


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('../npm/babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('../npm/babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('../npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _weex = require('./weex.js');

var _weex2 = _interopRequireDefault(_weex);

var _event = require('./event.js');

var _event2 = _interopRequireDefault(_event);

var _model = require('./model.js');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HOST = 'https://healcloud.cn';
var HTTPS_REG = /^https?\/\//;
var SUFFIX = '.json';
var SUFFIX_REG = /\.json$/;
var EMPTY = '';
var CACHED = {};
var CODE = {
  success: 200,
  login: 403,
  unfound: 404,
  networkerror: 0
};
var COUNTER = 0;

var Service = function () {
  function Service() {
    (0, _classCallCheck3.default)(this, Service);

    /* eslint no-plusplus:0 */
    this.id = COUNTER++;
    this.destroyed = 0;
  }

  (0, _createClass3.default)(Service, null, [{
    key: 'adapterUrl',
    value: function adapterUrl(url) {
      /* eslint no-param-reassign: 0 */
      HTTPS_REG.lastIndex = 0;
      SUFFIX_REG.lastIndex = 0;
      if (!HTTPS_REG.test(url)) {
        url = url.slice(0, 1) === '/' ? '' + HOST + url : HOST + '/' + url;
      }
      if (!SUFFIX_REG.test(url)) {
        url = '' + url + SUFFIX;
      }
      return url;
    }
    // 异步操作中避免重复性操作，进一步提升性能

  }, {
    key: 'getCached',
    value: function getCached() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var key = void 0;
      if (typeof options.url === 'string') {
        options.url = Service.adapterUrl(options.url);
        key = '$' + options.url;
      } else if (typeof options.fn === 'function') {
        key = '$' + (options.fn + EMPTY);
      }

      var cKey = '...' + key;

      return new _promise2.default(function (resolve, reject) {
        if (CACHED[key]) {
          return resolve(CACHED[key]);
        }
        // TODO Listen on
        _event2.default.on(key, function (res) {
          if (res.err) {
            return reject(res.err);
          }
          return resolve(res.data);
        });

        if (!CACHED[cKey]) {
          CACHED[cKey] = 1;
          if (options.url) {
            _weex2.default.request(options).then(function (data) {
              delete CACHED[cKey];
              _event2.default.fire(key, {
                err: null,
                data: data
              }, true);
            }).catch(function (err) {
              delete CACHED[cKey];
              _event2.default.fire(key, {
                err: err || '接口错误'
              }, true);
            });
          } else {
            options.fn.call(options.context).then(function (data) {
              delete CACHED[cKey];
              _event2.default.fire(key, {
                err: null,
                data: data
              }, true);
            }).catch(function (err) {
              delete CACHED[cKey];
              _event2.default.fire(key, {
                err: err || '接口错误'
              }, true);
            });
          }
        }
      });
    }
  }, {
    key: 'request',
    value: function request() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!options.url) {
        throw new Error('wx.request方法需要参数url，详情请见https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html#wxrequestobject');
      }
      (0, _assign2.default)(options, {
        url: Service.adapterUrl(options.url)
      });
      return new _promise2.default(function (resolve, reject) {
        Service.getCached({
          fn: _weex2.default.app.getSession,
          context: _weex2.default.app
        }).then(function (session) {
          (0, _assign2.default)(options.data || {}, {
            session: session
          });
          return _weex2.default.request(options).then(function (res) {
            if (res.code === CODE.success) {
              var data = res.result || res.data;
              var msg = res.msg || res.message;
              if (msg && msg.length) {
                data.msg = msg;
              }
              return resolve(new _model2.default(data));
            } else if (res.code === CODE.login) {
              _weex2.default.redirectTo({
                url: '/pages/login/index'
              });
              return reject(res.msg || 'Need Login');
            }
            reject(res.msg || '接口错误');
          }).catch(function (err) {
            reject(err);
          });
        }).catch(function () {
          // 没有session直接跳转到登录页面
          _weex2.default.redirectTo({
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
  }]);
  return Service;
}();

exports.default = Service;