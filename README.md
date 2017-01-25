### 微信小程序的一些限制

1、小程序源码打包后的大小限制为1M，超大传不上去。单次通过 wx.request传输的数据最大也是1M。

2、仅能支持部分ES6的语法，从文档来看连Promise也需要自己引入就知道支持的力度了。

3、不能通过第三方NPM包来直接安装使用。

4、官方API统一封装promise

> 综述：借鉴https://github.com/maichong/labrador-cli 的ES6 -> ES5方案，同时支持第三方NPM包使用，到此为止，接下来为保证源码限制，不在使用类似React、Vue这样的方式，使用其原始提供的API.

### 如何在微信小程序中使用ES6

```
npm install
gulp watch
```
