const gulp = require('gulp')
const gulpBabel = require('gulp-babel')
const gulpUglify = require('gulp-uglify')
// const gulpRename = require('gulp-rename')
gulp.task('script', () => {
  return gulp.src(['app/js/*.js'])
    .pipe(gulpBabel())
    // .pipe(gulp.dest('dist/js'))
    // .pipe(gulpUglify({
    //   compress: { properties: false },
    //   output: { quote_keys: true }
    // }))
    // .pipe(gulpRename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'))
})
