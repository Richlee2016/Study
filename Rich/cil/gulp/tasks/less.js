import gulp from 'gulp'
import postcss from 'gulp-postcss'
import less from 'gulp-less'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
// import base64 from 'gulp-base64'
import args from './util/args'
import { rootPath } from './util'

const { dir } = args

gulp.task('less', function () {
  var processors = [autoprefixer, cssnano]
  return gulp
    .src('app/**/*.less')
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(gulp.dest(rootPath(dir)))
})
