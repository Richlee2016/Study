const gulp = require('gulp')

gulp.task('files:images', () => {
  return gulp.src('app/images/*.{png,jpg,gif,ico}')
    .pipe(gulp.dest('dist/images'))
})

gulp.task('files:fonts', () => {
  return gulp.src('app/fonts/*')
    .pipe(gulp.dest('dist/fonts'))
})

gulp.task('files:plugin', () => {
  return gulp.src('app/plugin/*.js')
    .pipe(gulp.dest('dist/plugin'))
})
