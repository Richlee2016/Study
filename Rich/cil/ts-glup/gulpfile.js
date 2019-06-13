const gulp = require('gulp');
const requireDir = require('require-dir');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
requireDir('./build/tasks');

gulp.task('watcher', () => {
  gulp.watch('web/fonts/*', gulp.series('files:fonts'));
  gulp.watch('web/plugin/*', gulp.series('files:plugin'));
  gulp.watch('web/images/*', gulp.series('files:images'));
  gulp.watch('web/pug/**/*.pug', gulp.series('files:pug'));
  gulp.watch('web/ts/**/*.ts', gulp.series('script'));
  gulp.watch('web/css/**/*.css', gulp.series('style:css'));
  gulp.watch('web/css/**/*.less', gulp.series('style:less'));
});

gulp.task('server', () => {
  browserSync.init({
    proxy: 'http://localhost:7001',
    open: false,
  });

  gulp
    .watch([
      'web/view/**/*.html',
      'web/less/**/*.less',
      'web/js/**/*.js',
      'web/css/**/*.less',
      'web/css/**/*.css',
      'web/pug/**/*.pug',
      'web/ts/**/*.ts',
    ])
    .on('change', function() {
      reload();
    });
});

const style = gulp.parallel('style:css', 'style:less');
const files = gulp.parallel(
  'files:images',
  'files:fonts',
  'files:plugin',
  'files:pug'
);
// const watchServer = gulp.parallel('watcher')
const watchServer = gulp.parallel('watcher', 'server');

gulp.task('default', gulp.series('script', style, files, watchServer));
