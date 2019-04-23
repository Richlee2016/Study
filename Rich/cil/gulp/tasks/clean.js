import gulp from 'gulp'
import del from 'del'
import args from './util/args'
import { rootPath } from './util'

const { dir, view } = args

gulp.task('clean', () => {
  return del([rootPath(dir, 'css'), rootPath(dir, 'js'), rootPath(view, 'view')], { force: true })
})
