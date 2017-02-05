// index.js
// 获取应用实例
import wx, { mergeOptions } from '../../utils/weex';
import Service from '../../utils/service';
import Validation from '../../components/validation/index';
import Input from '../../components/input/index';

const EMPTY = '';
const options = mergeOptions({
  data: {
    userInfo: {}
  },
  onLoad() {
    console.log('login onLoad');
    this.valid = new Validation({
      phone: {
        required: [true, '请输入手机号码'],
        mobile: true
      },
      vcode: {
        required: [true, '请输入验证码']
      }
    });
    // 调用应用实例的方法获取全局数据
    return wx.app.getUserInfo()
    .then((userInfo) => {
      console.log('getUserInfo Promise', userInfo);
      this.setData({
        userInfo
      });
    })
    .catch((reason) => {
      console.log(reason);
    });
  },
  onReady() {
    console.log('login onReady');
  },
  onUnload() {
    this.valid = null;
  },
  formSubmit(event) {
    if (!this.valid.isValid(event)) {
      const error = this.valid.errors[0];
      return wx.showModal({
        title: '友情提示',
        content: `${error.msg}`,
        showCancel: false
      });
    }
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    wx.request({
      url: Service.adapterUrl('/api/doctor/login'),
      data: {
        contact_mobile: event.detail.value.phone,
        vcode: event.detail.value.vcode
        // 暂时看不需要微信login code
      },
      method: 'POST'
    })
    .then((data) => {
      // 设置Session，页面跳转到协议页面
      /* eslint no-param-reassign:0 */
      data = data.data;
      const session = data.result.session;
      const role = wx.app.data.roleMap[data.result.role];
      // 存储在App global Data中 以及在storage中
      wx.app.data.session = session;
      wx.setStorage({
        key: 'session',
        data: session
      })
      .then(() => {
        wx.showToast({
          title: role ? '登陆成功' : '新用户注册成功',
          icon: 'loading'
        });
        if (role) {
          return wx.redirectTo({
            url: `/pages/user/${role}/index`
          });
        }
        return wx.redirectTo({
          url: '/pages/login/protocol'
        });
      });
    })
    .catch((err) => {
      wx.showModal({
        title: '友情提示',
        content: `登录失败，错误原因：${err}`,
        showCancel: false
      });
    });
  }
}, Input);

Page(options);
