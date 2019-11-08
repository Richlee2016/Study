const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
// const gulpUglify = require('gulp-uglify');
// const gulpRename = require('gulp-rename')
const path = require('path');
const gulpTs = require('gulp-typescript');
const tsConfig = gulpTs.createProject(
  path.resolve(__dirname, '../../web/tsconfig.json')
);
const { root } = require('../utils');
gulp.task('script', () => {
  return tsConfig
    .src()
    .pipe(tsConfig())
    .js.pipe(gulpBabel())
    .pipe(gulp.dest(root('/public/js')));
});

// gulp.task('script', () => {
//   return gulp.src(['app/js/*.js'])
//     .pipe(gulpBabel())
//     // .pipe(gulp.dest('dist/js'))
//     // .pipe(gulpUglify({
//     //   compress: { properties: false },
//     //   output: { quote_keys: true }
//     // }))
//     // .pipe(gulpRename({ suffix: '.min' }))
//     .pipe(gulp.dest('dist/js'))
// })
