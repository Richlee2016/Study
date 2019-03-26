const path = require('path')
const RichWebpackPlugin = require('./webpack/lp/plugin/rich-plugin')
module.exports = {
  entry: './webpack/lp/index.js',
  output: {
    path: path.resolve(__dirname, './webpack/lp/dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: path.resolve(__dirname, './webpack/lp/loader/base.js'),
        options: {
          one: 'good'
        }
      }
    ]
  },
  plugins: [
    new RichWebpackPlugin({ name: 'rich' })
  ]
}
