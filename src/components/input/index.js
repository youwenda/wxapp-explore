const EMPTY = '';
const Input = {
  data: {
    value: EMPTY
  },
  onLoad() {
    console.log('enhauncd input onLoad');
  },
  onReady() {
    console.log('enhauncd input onReady');
  },
  clearInput() {
    this.setData({
      value: EMPTY
    });
  },
  inputTyping(e) {
    this.setData({
      value: e.detail.value
    });
  }
};

export default Input;

