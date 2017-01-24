'use strict';

const path = require('path');

const config = {
  npmMap: {},
  get workDir() {
    return path.join(__dirname, '../');
  },
  get srcDir() {
    return path.join(this.workDir, './src/');
  },
  get buildDir() {
    return path.join(this.workDir, './build/');
  },
  get modulesDir() {
    return path.join(this.workDir, './node_modules/');
  }
};

module.exports = config;
