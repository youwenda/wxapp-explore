const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const del = require('del');
const through = require('through2');
const $ = require('gulp-load-plugins')();
const mkdirp = require('mkdirp');
const config = require('./tasks/config');
const transform = require('./tasks/transform');

const targets = {};

gulp.task('del-build', () => del(['./build']));
gulp.task('copy', ['del-build'], () => {
  return gulp
  .src(['!./src/*.js', '!./src/**/*.js', './src/**/'])
  .pipe(gulp.dest('./build'));
});
gulp.task('transform', ['copy'], () => {
  return gulp
  .src(['./src/*.js', './src/**/*.js'])
  .pipe(through.obj((file, enc, cb) => {
    if (file.isNull()) {
      // 返回空文件
      cb(null, file);
    }
    transform(file.path, file.path.replace(config.srcDir, config.buildDir), targets);
    cb();
  }));
});

gulp.task('watch', ['transform'], () => {
  $.watch(['./src/**'], (e) => {
    console.log(`[watch]:${e.path} has ${e.event}`);
    delete targets[e.path];
    if (fs.existsSync(e.path)) {
      if (path.extname(e.path) === '.js') {
        transform(e.path, e.path.replace(config.srcDir, config.buildDir));
      } else {
        const content = fs.readFileSync(e.path, 'utf8');
        const dest = e.path.replace(config.srcDir, config.buildDir);
        mkdirp.sync(path.dirname(dest));
        fs.writeFileSync(dest, content, 'utf8');
      }
    } else {
      del([e.path.replace(config.srcDir, config.buildDir)]);
    }
  });
});

