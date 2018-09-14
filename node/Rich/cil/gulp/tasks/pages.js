import gulp from 'gulp'
import args from './util/args'
import { rootPath } from './util'

const { view } = args

gulp.task('view', () => {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest(rootPath(view)))
})
