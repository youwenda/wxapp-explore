import wx from '../../utils/weex';
import Validation from '../../components/validation/index';
import Service from '../../utils/service';

Page({
  data: {
    roleItems: [{
      name: '患者',
      value: wx.app.data.roleMap['1'],
      desc: '我是患者',
      icon: '../../assets/images/patient.png',
      checked: true
    }, {
      name: '医护及辅助人员',
      value: wx.app.data.roleMap['2'],
      desc: '我是医生',
      icon: '../../assets/images/doctor.png'
    }]
  },
  onLoad() {
    this.roleMap = {};
    this.data.roleItems.forEach((v) => {
      this.roleMap[v.value] = v;
    });
    this.valid = new Validation({
      agree: {
        required: [true, '请仔细阅读并同意相关条款']
      }
    });
  },
  radioChange(e) {
    /* eslint eqeqeq: 0 */
    const roleItems = this.data.roleItems;
    for (let i = 0, len = roleItems.length; i < len; i++) {
      roleItems[i].checked = roleItems[i].value == e.detail.value;
    }
    this.setData({
      roleItems
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
    const role = e.detail.value.role;
    wx.showModal({
      title: '友情提示',
      content: `您当前选择的是注册角色是${this.roleMap[role].name}`
    })
    .then((res) => {
      if (res.confirm) {
        wx.showToast({
          title: '加载中',
          icon: 'loading'
        });
        new Service()
        .request({
          url: '/api/common/setUserInfo',
          data: {
            key: 'contact_name',
            value: role
          },
          method: 'POST'
        })
        .then(() => {
          wx.navigateTo({
            url: `/pages/user/${role}/index`
          });
        })
        .catch((error) => {
          wx.showModal({
            title: '友情提示',
            content: `${error.msg}`,
            showCancel: false
          });
        });
      }
    });
  }
});
