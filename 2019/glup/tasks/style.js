const gulp = require('gulp')
const gulpPostcss = require('gulp-postcss')
const gulpLess = require('gulp-less')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano') // 压缩css

gulp.task('style:css', () => {
  return gulp.src('app/css/*.css')
    .pipe(gulpPostcss([autoprefixer, cssnano]))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('style:less', () => {
  return gulp.src('app/css/*.less')
    .pipe(gulpLess())
    .pipe(gulpPostcss([autoprefixer]))
    .pipe(gulp.dest('dist/css'))
})
