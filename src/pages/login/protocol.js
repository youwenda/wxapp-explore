import wx from '../../utils/weex';
import Validation from '../../components/validation/index';

Page({
  data: {
    radioItems: [{
      name: '患者',
      value: 0,
      desc: '我是患者',
      icon: '../../assets/images/patient.png',
      checked: true
    }, {
      name: '医生',
      value: 1,
      desc: '我是医生',
      icon: '../../assets/images/doctor.png'
    }]
  },
  onLoad() {
    this.radioMap = {};
    this.data.radioItems.forEach((v) => {
      this.radioMap[v.value] = v;
    });
    this.valid = new Validation({
      agree: {
        required: [true, '请仔细阅读并同意相关条款']
      }
    });
  },
  radioChange (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    const radioItems = this.data.radioItems;
    for (let i = 0, len = radioItems.length; i < len; i++) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems
    });
  },
  bindAgreeChange(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  formSubmit(e) {
    if (!this.valid.isValid(e)) {
      const error = this.valid.errors[0];
      return wx.showModal({
        title: '友情提示',
        content: `${error.msg}`,
        showCancel: false
      });
    }
    wx.showModal({
      title: '友情提示',
      content: `您当前选择的是注册角色是${this.radioMap[e.detail.value.role].name}`
    })
    .then((res) => {
      if (res.confirm) {
        wx.showToast({
          title: '加载中',
          icon: 'loading'
        });
        wx.navigateTo({
          url: '/pages/index/profile'
        });
      }
    });
  }
});
