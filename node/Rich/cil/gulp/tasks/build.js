import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'

gulp.task('build', gulpSequence('clean', 'images', 'fonts', 'plugin', 'css', 'less', 'view', 'scripts', ['browser', 'server']))
