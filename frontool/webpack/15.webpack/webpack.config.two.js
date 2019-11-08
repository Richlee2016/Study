const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // entry: './react/Api/index.js',
  entry: './test/index.js',
  output: {
    path: path.join(__dirname, 'src/base')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        query: {
          presets: ['env', 'es2015', 'react'],
          plugins: ['transform-object-rest-spread', 'transform-runtime']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // template: 'react/Api/index.html',
      template: 'react/reactdiff/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      // template: 'react/Api/index.html',
      template: 'react/reactdiff/index.html',
      filename: 'index.html',
      // 是否压缩
      minify: {
        // 是否去掉 属性的 引号
        removeAttributeQuotes: true
      }
    })
  ],
  // 静态服务器
  devServer: {
    contentBase: './src',
    host: 'localhost',
    port: 8083,
    compress: true// 启动gzip
  }
}
