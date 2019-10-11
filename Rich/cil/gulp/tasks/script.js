const gulp = require("gulp");
const webpack = require("webpack");
const gulpWebpack = require("webpack-stream");
const gulpUglify = require("gulp-uglify");
const named = require("vinyl-named");
const plumber = require("gulp-plumber");
// const gulpRename = require('gulp-rename')
gulp.task("script", () => {
  return (
    gulp
      .src(["app/js/*.js"])
      .pipe(
        plumber({
          errorHandle: function() {}
        })
      )
      .pipe(named())
      .pipe(
        gulpWebpack({
          module: {
            rules: [
              {
                test: /\.js$/,
                loader: "babel-loader"
              }
            ]
          },
          devtool: "source-map"
        })
      )
      // .pipe(gulp.dest('dist/js'))
      // .pipe(gulpUglify({
      //   compress: { properties: false },
      //   output: { quote_keys: true }
      // }))
      // .pipe(gulpRename({ suffix: '.min' }))
      .pipe(gulp.dest("dist/js"))
  );
});
