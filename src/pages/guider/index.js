Page({
  data: {
    images: [
      'https://gw.alicdn.com/tps/i2/T1eppkFThaXXcbqQZo-320-480.png',
      'https://gw.alicdn.com/tps/i3/T1unFhFFxdXXcbqQZo-320-480.png',
      'https://gw.alicdn.com/tps/i4/T13aBkFJFaXXcbqQZo-320-480.png'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  swiperchange(e) {
    this.setData({
      last: e.detail.current === this.data.images.length - 1
    });
  }
});
