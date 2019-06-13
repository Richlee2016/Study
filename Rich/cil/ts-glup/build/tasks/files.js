const gulp = require('gulp');
const { root, dirRoot } = require('../utils');
gulp.task('files:images', () => {
  return gulp
    .src(dirRoot('/images/*.{png,jpg,gif,ico}'))
    .pipe(gulp.dest(root('/public/images')));
});

gulp.task('files:fonts', () => {
  return gulp.src(dirRoot('/fonts/*')).pipe(gulp.dest(root('/public/fonts')));
});

gulp.task('files:plugin', () => {
  return gulp
    .src(dirRoot('/plugin/**/*.js'))
    .pipe(gulp.dest(root('/public/plugin')));
});

gulp.task('files:pug', () => {
  return gulp.src(dirRoot('/pug/**/*.pug')).pipe(gulp.dest(root('/view')));
});
