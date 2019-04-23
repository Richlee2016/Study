import gulp from 'gulp'
import args from './util/args'

var browserSync = require('browser-sync').create()
var reload = browserSync.reload

gulp.task('server', cb => {
  if (!args.watch) return cb()

  browserSync.init({
    proxy: 'http://localhost:7001'
  })

  gulp
    .watch(['app/view/*.html', 'app/less/*.less', 'app/js/*.js', 'app/css/*.less', 'app/css/*.css'])
    .on('change', function () {
      reload()
    })
})
