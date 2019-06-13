const gulp = require('gulp');
const { root } = require('../utils');

gulp.task('view:pug', () => {
  return gulp.src('app/pug/*.pug').pipe(gulp.dest(root('view')));
});
