const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let cssExtract = new ExtractTextWebpackPlugin('static/css/main.css')
let lessExtract = new ExtractTextWebpackPlugin('static/css/less.css')
module.exports = {
  entry: {
    index: './webpack/pack/index.js',
    main: './webpack/pack/main.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'static/js/[name].js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, './webpack/pack'),
        exclude: path.resolve(__dirname, 'node_modules'),
        query: {
          presets: ['env', 'es2015']
        }
      },
      {
        test: /\.css$/,
        // loader: ['style-loader', 'css-loader', 'postcss-loader']
        loader: cssExtract.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.less$/,
        // loader: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
        loader: lessExtract.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader', 'postcss-loader']
        })
      },
      {
        test: /\.(png|jpg|gif|svg|bmp)/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5 * 1024,
            name: '[name].[ext]',
            outputPath: 'static/images/',
            // 背景图片的公共 路径
            publicPath: '../images'
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './webpack/pack/index.html'),
      title: '很好很强大',
      chunks: ['index', 'main'],
      minify: {
        removeAttributeQuotes: true
      },
      hash: true
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, './webapck/pack/static'),
    //     to: 'static',
    //     ignore: ['.*']
    //   }
    // ]),
    cssExtract,
    lessExtract
  ]
}
