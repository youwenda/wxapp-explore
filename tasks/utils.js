'use strict';

const fs = require('fs');
const path = require('path');
const minimatch = require('minimatch');
const config = require('./config');

let babelFileData = null;
/**
 * 判断指定路径是否是文件
 * @param path
 * @returns {boolean}
 */
exports.isFile = function isFile(file) {
  try {
    return fs.statSync(file).isFile();
  } catch (e) {
    return false;
  }
};


/**
 * 判断指定路径是否是文件夹
 * @param path
 * @returns {boolean}
 */
exports.isDirectory = function isDirectory(file) {
  try {
    return fs.statSync(file).isDirectory();
  } catch (e) {
    return false;
  }
};

/**
 * 判断某个文件是否是node_modules中的文件
 * @param file
 * @returns {boolean}
 */
exports.inNpm = function inNpm(file) {
  return path.relative(config.modulesDir, file)[0] !== '.';
};

/**
 * 获取文件信息
 * @param file
 * @returns {FileInfo}
 */
exports.getInfo = function getInfo(file) {
  const info = path.parse(file);
  return Object.assign(info, {
    file: path.normalize(file),
    relative: path.relative(config.workDir, file),
    fromSrc: path.relative(config.srcDir, file),
    fromBuild: path.relative(config.buildDir, file)
  });
};

/**
 * 读取json文件信息
 */
exports.readJSON = function readJSON(file) {
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
};

exports.getBabelConfig = function getBabelConfig() {
  if (!babelFileData) {
    const file = path.join(config.workDir, '.babelrc');
    let content = '{}';
    if (exports.isFile(file)) {
      content = fs.readFileSync(file, 'utf8');
    }
    babelFileData = JSON.parse(content);
  }
  return babelFileData;
};

/**
 * @param {string} file
 * @returns {boolean}
 */
function match(file, role) {
  if (typeof role === 'string') {
    return minimatch(file, role);
  } else if (Array.isArray(role)) {
    for (const r of role) {
      if (match(file, r)) {
        return true;
      }
    }
  }
  return false;
}

exports.shouldBabelIgnore = function shouldBabelIgnore(file) {
  const babelConfig = exports.getBabelConfig();
  if (babelConfig.only) {
    return !match(file, babelConfig.only);
  }
  if (!babelConfig.ignore) {
    return false;
  }

  return match(file, babelConfig.ignore);
};
