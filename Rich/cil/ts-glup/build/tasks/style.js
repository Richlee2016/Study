const gulp = require('gulp');
const gulpPostcss = require('gulp-postcss');
const gulpLess = require('gulp-less');
const { root, dirRoot } = require('../utils');
console.log(dirRoot('/css/**/*.css'));
gulp.task('style:css', () => {
  return gulp
    .src(dirRoot('/css/**/*.css'))
    .pipe(gulpPostcss())
    .pipe(gulp.dest(root('public/css')));
});

gulp.task('style:less', () => {
  return gulp
    .src(dirRoot('/css/**/*.less'))
    .pipe(gulpLess())
    .pipe(gulpPostcss())
    .pipe(gulp.dest(root('public/css')));
});
