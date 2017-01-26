'use strict';

const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const slash = require('slash');
const mkdirp = require('mkdirp');
const config = require('./config');
const utils = require('./utils');

const EMPTY = '';
const window = `{
  Array: Array,
  Date: Date,
  Error: Error,
  Function: Function,
  Math: Math,
  Object: Object,
  RegExp: RegExp,
  String: String,
  TypeError: TypeError,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval
}`;

module.exports = function transform(from, to, targets = {}) {
  if (typeof from === 'string') {
    from = utils.getInfo(from);
  }
  if (typeof to === 'string') {
    to = utils.getInfo(to);
  }
  if (targets[to.file]) {
    return;
  }
  const buildNpmDir = `${config.buildDir}npm/`;
  const isNPM = utils.inNpm(from.file);
  targets[to.file] = true;

  let code = fs.readFileSync(from.file, 'utf8');
  if (!utils.shouldBabelIgnore(from.relative)) {
    code = babel.transform(code, Object.assign({}, utils.getBabelConfig())).code;
  }
  code = code.replace(/(?:(['"])use strict\1\s*;)/g, EMPTY);
  // 如果代码中引用了global或window，则使用变量window进行替换
  if (/\b(?:global|window)\b/.test(code)) {
    code = `var global = window = ${window};${code}`;
  }
  if (/[^\w_]process\.\w/.test(code) && !/typeof process/.test(code)) {
    code = `var process={};${code}`;
  }

  code = code.replace(/([\w\[\]a-d\.]+)\s*instanceof Function/g, (matchs, word) => ` typeof ${word} === 'function' `);  
  code = code.replace(/require\(['"]([\w\d_\-\.\/]+)['"]\)/ig, (match, lib) => {
    // 如果引用文件是相对位置引用，并且当前文件不是NPM包文件，不存在映射
    if (lib[0] === '.' && !isNPM) {
      const file = path.join(path.dirname(from.file), lib);
      // 兼容省略了.js的路径
      /* eslint no-param-reassign:0 */
      if (!utils.isFile(file) && utils.isFile(`${file}.js`)) {
        lib += '.js';
      }
      // 兼容省略了/index.js的路径
      if (!utils.isFile(file) && utils.isFile(`${file}/index.js`)) {
        lib += '/index.js';
      }
      return `require('${lib}')`;
    }

    // 如果引用NPM包文件
    let source;
    let target;
    if (lib.indexOf('/') === -1 || lib.indexOf('/') === lib.length - 1) {
      // 只指定了包名
      lib = lib.replace(/\//, EMPTY);
      if (config.npmMap && config.npmMap.hasOwnProperty(lib)) {
        lib = config.npmMap[lib];
      }
      const dir = path.join(config.modulesDir, lib);
      const pkgFile = path.join(dir, '/package.json');
      if (utils.isFile(pkgFile)) {
        const pkg = utils.readJSON(pkgFile);
        let main = pkg.main || 'index.js';
        if (pkg.browser && typeof pkg.browser === 'string') {
          main = pkg.browser;
        } else if (pkg['jsnext:main']) {
          main = pkg['jsnext:main'];
        }
        source = path.join(config.modulesDir, lib, main);
      } else {
        source = dir;
      }
      if (!utils.isFile(source)) {
        if (utils.isFile(`${source}.js`)) {
          source += '.js';
        } else if (utils.isFile(`${source}/index.js`)) {
          source += '/index.js';
        }
      }
      target = path.join(buildNpmDir, path.relative(config.modulesDir, source));
    } else {
      // 如果还指定了包里边的路径
      lib = lib.replace(/^([\w\.\-\_]+)/i, (name) => {
        if (config.npmMap && config.npmMap.hasOwnProperty(name)) {
          return config.npmMap[name];
        }
        return name;
      });
      source = config.modulesDir + lib;
      target = buildNpmDir + lib;
      if (lib[0] === '.') {
        source = path.join(from.dir, lib);
        target = path.join(to.dir, lib);
      }
      if (!utils.isFile(source) && utils.isFile(`${source}.js`)) {
        source += '.js';
        target += '.js';
      } else if (utils.isDirectory(source)) {
        source += '/index.js';
        target += '/index.js';
      }
      if (!utils.isFile(source)) {
        throw new Error(`Can not resolve ${lib}`);
      }
    }
    source = path.normalize(source);
    target = path.normalize(target);

    const sourceRelative = slash(path.relative(config.modulesDir, source));
    if (config.npmMap.hasOwnProperty(sourceRelative)) {
      // TODO log
      source = path.join(config.modulesDir, config.npmMap[sourceRelative]);
      target = path.join(config.distDir, 'npm', config.npmMap[sourceRelative]);
    }

    let relative = slash(path.relative(to.dir, target));
    if (!targets[target]) {
      transform(source, target, targets);
    }

    relative = slash(relative);
    if (relative[0] !== '.') {
      relative = `./${relative}`;
    }

    return `require('${relative}')`;
  });

  code = `"use strict";var exports=module.exports={};
${code}`;

  mkdirp.sync(to.dir);
  fs.writeFileSync(to.file, code);
};


