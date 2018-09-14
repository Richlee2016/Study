import gulp from 'gulp'
import args from './util/args'
import imagemin from 'gulp-imagemin'
import { rootPath } from './util'
const { dir } = args

gulp.task('images', () => {
  return gulp.src('app/images/*.{png,jpg,gif,ico}')
  // .pipe(imagemin({
  //   optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
  //   progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
  //   interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
  //   multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
  // }))
  .pipe(gulp.dest(rootPath(dir, 'images')))
})

gulp.task('fonts', () => {
  return gulp.src('app/fonts/*').pipe(gulp.dest(rootPath(dir, 'fonts')))
})

gulp.task('plugin', () => {
  return gulp.src('app/plugin/*.js').pipe(gulp.dest(rootPath(dir, 'plugin')))
})
