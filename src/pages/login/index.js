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
      url: Service.adapterUrl('/api/login'),
      data: {
        phone: event.detail.value.phone,
        vcode: event.detail.value.vcode
      },
      method: 'POST'
    })
    .then(() => {
      // 设置Session，页面跳转到协议页面
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
