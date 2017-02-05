"use strict";var exports=module.exports={};


var _weex = require('../../utils/weex.js');

var _weex2 = _interopRequireDefault(_weex);

var _index = require('../../components/validation/index.js');

var _index2 = _interopRequireDefault(_index);

var _service = require('../../utils/service.js');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Page({
  data: {
    roleItems: [{
      name: '患者',
      value: _weex2.default.app.data.roleMap['1'],
      desc: '我是患者',
      icon: '../../assets/images/patient.png',
      checked: true
    }, {
      name: '医护及辅助人员',
      value: _weex2.default.app.data.roleMap['2'],
      desc: '我是医生',
      icon: '../../assets/images/doctor.png'
    }]
  },
  onLoad: function onLoad() {
    var _this = this;

    this.roleMap = {};
    this.data.roleItems.forEach(function (v) {
      _this.roleMap[v.value] = v;
    });
    this.valid = new _index2.default({
      agree: {
        required: [true, '请仔细阅读并同意相关条款']
      }
    });
  },
  radioChange: function radioChange(e) {
    var roleItems = this.data.roleItems;
    for (var i = 0, len = roleItems.length; i < len; i++) {
      roleItems[i].checked = roleItems[i].value == e.detail.value;
    }
    this.setData({
      roleItems: roleItems
    });
  },
  bindAgreeChange: function bindAgreeChange(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  formSubmit: function formSubmit(e) {
    if (!this.valid.isValid(e)) {
      var error = this.valid.errors[0];
      return _weex2.default.showModal({
        title: '友情提示',
        content: '' + error.msg,
        showCancel: false
      });
    }
    var role = e.detail.value.role;
    _weex2.default.showModal({
      title: '友情提示',
      content: '\u60A8\u5F53\u524D\u9009\u62E9\u7684\u662F\u6CE8\u518C\u89D2\u8272\u662F' + this.roleMap[role].name
    }).then(function (res) {
      if (res.confirm) {
        _weex2.default.showToast({
          title: '加载中',
          icon: 'loading'
        });
        new _service2.default().request({
          url: '/api/common/setUserInfo',
          data: {
            key: 'contact_name',
            value: role
          },
          method: 'POST'
        }).then(function () {
          _weex2.default.navigateTo({
            url: '/pages/user/' + role + '/index'
          });
        }).catch(function (error) {
          _weex2.default.showModal({
            title: '友情提示',
            content: '' + error.msg,
            showCancel: false
          });
        });
      }
    });
  }
});