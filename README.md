### 微信小程序的一些限制

1、小程序源码打包后的大小限制为1M，超大传不上去。单次通过 wx.request传输的数据最大也是1M。

2、仅能支持部分ES6的语法，从文档来看连Promise也需要自己引入就知道支持的力度了。

3、不能通过第三方NPM包来直接安装使用。

4、样式上不能使用级联样式，并且可以支持`import`语法的使用，因此使用less、sass这样的工具意义不大。

> 综述：借鉴https://github.com/maichong/labrador-cli 的ES6 -> ES5方案，同时支持第三方NPM包使用，到此为止，接下来为保证源码大小的限制，不在使用类似React、Redux这样的方式，使用其原始提供的API.

### 如何开发

```
npm install
gulp watch
```

### 微信小程序开发工具使用

1、新建项目，本地开发目录选择 `build` 目标目录

2、手机预览时，请勾选 `上传代码样式自动补全`

### Commit 提交规范

根据 [angular 规范](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit-message-format)提交 commit，这样 history 看起来更加清晰，还可以自动生成 changelog。

```xml

<!--注意scope外面的: 与 subject之间有一个空格-->
<type>(<scope>): <subject>
<!-- 以下为非必填 -->
<BLANK LINE>
<body>
<BLANK LINE>
<footer>

```

（1）type

> 提交 commit 的类型，包括以下几种

- feat: 新功能
- fix: 修复问题
- docs: 修改文档
- style: 修改代码格式，不影响代码逻辑
- refactor: 重构代码，理论上不影响现有功能
- perf: 提升性能
- test: 增加修改测试用例
- chore: 修改工具相关（包括但不限于文档、代码生成等）
- deps: 升级依赖

（2）scope

> 修改文件的范围（包括但不限于 git分支名、功能名称、doc、bug、issure等）

（3）subject

> 用一句话清楚的描述这次提交做了什么

（4）body

> 补充 subject，适当增加原因、目的等相关因素，也可不写。

（5）footer

- ___当有非兼容修改(Breaking Change)时必须在这里描述清楚___
- 关联相关 issue，如 `Closes #1, Closes #2, #3`
