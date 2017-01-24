"use strict";var exports=module.exports={};
  

// index.js
// 获取应用实例
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onLoad: function onLoad() {
    var _this = this;

    // 调用应用实例的方法获取全局数据
    return app.getUserInfo().then(function (userInfo) {
      console.log('getUserInfo Promise', userInfo);
      _this.setData({
        userInfo: userInfo
      });
    }).catch(function (reason) {
      console.log(reason);
    });
  }
});
  