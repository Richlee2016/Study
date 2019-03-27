const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const cssLoader = {
  css: ExtractTextPlugin.extract({
    use: [
      { loader: 'css-loader', options: { sourceMap: true } },
      { loader: 'postcss-loader', options: { sourceMap: true } }
    ],
    fallback: 'vue-style-loader'
  }),
  postcss: ExtractTextPlugin.extract({
    use: [
      { loader: 'css-loader', options: { sourceMap: true } },
      { loader: 'postcss-loader', options: { sourceMap: true } }
    ],
    fallback: 'vue-style-loader'
  }),
  less: ExtractTextPlugin.extract({
    use: [
      { loader: 'css-loader', options: { sourceMap: true } },
      { loader: 'postcss-loader', options: { sourceMap: true } },
      { loader: 'less-loader', options: { sourceMap: true } }
    ],
    fallback: 'vue-style-loader'
  }),
  stylus: ExtractTextPlugin.extract({
    use: [
      { loader: 'css-loader', options: { sourceMap: true } },
      { loader: 'postcss-loader', options: { sourceMap: true } },
      { loader: 'stylus-loader', options: { sourceMap: true } }
    ],
    fallback: 'vue-style-loader'
  }),
  styl: ExtractTextPlugin.extract({
    use: [
      { loader: 'css-loader', options: { sourceMap: true } },
      { loader: 'postcss-loader', options: { sourceMap: true } },
      { loader: 'stylus-loader', options: { sourceMap: true } }
    ],
    fallback: 'vue-style-loader'
  })
}
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: path.posix.join('static', 'js/[name].js'),
    chunkFilename: path.posix.join('static', 'js/[id].js')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cssSourceMap: true,
          cacheBusting: true,
          transformToRequire: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.css$/,
        use: cssLoader.css
      },
      {
        test: /\.less$/,
        use: cssLoader.less
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'media/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'fonts/[name].[ext]')
        }
      }
    ]
  },
  devtool: '#source-map',
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    // 压缩js
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true,
      parallel: true
    }),
    // 提取css
    new ExtractTextPlugin({
      filename: path.posix.join('static', 'css/[name].css'),
      allChunks: true
    }),
    // 压缩 css
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true, map: { inline: false } }
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: path.resolve(__dirname, '../dist/index.html'),
      inject: true,
      hash: true
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'app',
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          filename: path.posix.join('static', 'js/[name].js')
        }
      }
    }
  }
}
