import gulp from 'gulp'
import gulpif from 'gulp-if'
import webpack from 'webpack'
import gulpWebpack from 'webpack-stream'
import named from 'vinyl-named'
import plumber from 'gulp-plumber'
import uglify from 'gulp-uglify'
import { log, colors } from 'gulp-util'
import args from './util/args'

import { rootPath } from './util'

const { dir, production } = args
gulp.task('scripts', () => {
  return gulp
    .src(['app/js/*.js'])
    .pipe(
      plumber({
        errorHandle: function () {}
      })
    )
    .pipe(named())
    .pipe(
      gulpWebpack({
        module: {
          loaders: [
            {
              test: /\.js$/,
              loader: 'babel'
            }
          ]
        }
      }),
      null,
      (err, stats) => {
        log(
          `Finished '${colors.cyan('scripts')}'`,
          stats.toString({
            chunks: false
          })
        )
      }
    )
    .pipe(
      gulpif(
        production,
        uglify({
          compress: { properties: false },
          output: { quote_keys: true }
        })
      )
    )
    .pipe(gulp.dest(rootPath(dir, 'js')))
})
