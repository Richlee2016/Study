import gulp from 'gulp'
import args from './util/args'

gulp.task('browser', (cb) => {
  if (!args.watch) return cb()
  gulp.watch('app/fonts/*', ['fonts'])
  gulp.watch('app/images/*', ['images'])
  gulp.watch('app/**/*.js', ['scripts'])
  gulp.watch('app/**/*.css', ['css'])
  gulp.watch('app/**/*.less', ['less'])
  gulp.watch('app/**/*.html', ['view'])
})
