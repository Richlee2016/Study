const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
console.log(31)
module.exports = {
  entry: './react/router/index.js',
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
          presets: ['env', 'es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'react/router/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: 'react/router/index.html',
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
