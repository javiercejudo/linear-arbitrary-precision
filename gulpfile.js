var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var rimraf = require('rimraf');
var coveralls = require('gulp-coveralls');
var combine = require('istanbul-combine');

var decimalDep = process.env.DECIMAL ? process.env.DECIMAL : 'big.js';

gulp.task('clean', function (cb) {
  rimraf('./coverage', cb);
});

gulp.task('cleanReport', function (cb) {
  rimraf('./coverage/' + decimalDep, cb);
});

gulp.task('instrument', function () {
  return gulp.src(['src/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['cleanReport', 'instrument'], function () {
  return gulp.src(['test/*.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports({
      reportOpts: {
        dir: './coverage/' + decimalDep
      }
    }));
});

gulp.task('combineReports', function (cb) {
  var opts = {
    pattern: 'coverage/**/coverage-final.json',
    print: 'both',
    reporters: {
      lcov: {}
    }
  };

  combine.sync(opts);
  cb();
});

gulp.task('coveralls', function () {
  gulp.src('coverage/lcov.info')
    .pipe(coveralls());
});

gulp.task('default', ['test']);
