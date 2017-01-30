"use strict";var exports=module.exports={};


Object.defineProperty(exports, "__esModule", {
  value: true
});
var EMPTY = '';
var Input = {
  data: {
    value: EMPTY
  },
  onLoad: function onLoad() {
    console.log('enhauncd input onLoad');
  },
  onReady: function onReady() {
    console.log('enhauncd input onReady');
  },
  clearInput: function clearInput() {
    this.setData({
      value: EMPTY
    });
  },
  inputTyping: function inputTyping(e) {
    this.setData({
      value: e.detail.value
    });
  }
};

exports.default = Input;