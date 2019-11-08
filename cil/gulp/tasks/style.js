const gulp = require("gulp");
const gulpPostcss = require("gulp-postcss");
const gulpLess = require("gulp-less");

gulp.task("style:css", () => {
  return gulp
    .src("app/css/**/*.css")
    .pipe(gulpPostcss())
    .pipe(gulp.dest("dist/css"));
});

gulp.task("style:less", () => {
  return gulp
    .src("app/css/**/*.less")
    .pipe(gulpLess())
    .pipe(gulpPostcss())
    .pipe(gulp.dest("dist/css"));
});
