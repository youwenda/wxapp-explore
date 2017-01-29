// index.js
// 获取应用实例
import wx from '../../utils/weex';
import Validation from '../../components/validation/index';

const EMPTY = '';

Page({
  data: {
    phone: EMPTY,
    vcode: EMPTY,
    inputVal: EMPTY,    
    userInfo: {}
  },
  clearInput() {
    console.log('clearInput');
    this.setData({
      inputVal: EMPTY
    });
  },
  inputTyping(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onLoad() {
    this.valid = new Validation({
      phone: {
        required: [true, '请输入手机号码'],
        mobile: true
      },
      vcode: {
        required: [true, '请输入验证码'],
        regex: /\d{4,5}/
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
  bindfocus(event) {
    console.log('bindfocus', event);
  },
  formSubmit(event) {
    console.log('formSubmit', event);
    console.log(this.valid.isValid(event), this.valid.errors);
    const error = this.valid.errors[0];
    wx.showModal({
      title: '友情提示',
      content: `${error.msg}`,
      showCancel: !1
    });
  }
});
