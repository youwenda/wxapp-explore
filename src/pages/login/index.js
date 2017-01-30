// index.js
// 获取应用实例
import wx, { mergeOptions } from '../../utils/weex';
import Validation from '../../components/validation/index';
import Input from '../../components/input/index';

const EMPTY = '';
const options = mergeOptions({
  data: {
    phone: EMPTY,
    vcode: EMPTY,
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
  onReady() {
    console.log('login onReady');
  },
  formSubmit(event) {
    if (!this.valid.isValid(event)) {
      const error = this.valid.errors[0];
      wx.showModal({
        title: '友情提示',
        content: `${error.msg}`,
        showCancel: !1
      });
    }
  }
}, Input);

Page(options);
