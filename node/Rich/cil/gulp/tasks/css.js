import gulp from 'gulp'
import args from './util/args'
// import base64 from 'gulp-base64'
import { rootPath } from './util'

const { dir } = args
gulp.task('css', () => {
  return gulp.src('app/**/*.css')
    .pipe(gulp.dest(rootPath(dir)))
})
