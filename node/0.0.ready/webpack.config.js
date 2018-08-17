const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
let ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
let cssExtract = new ExtractTextWebpackPlugin("common.css");
let lessExtract = new ExtractTextWebpackPlugin("main.css");
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: {
    index: "./redux/index.js"
  },
  output: {
    path: path.join(__dirname,"dist"),
    filename: "[name].js"
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@redux': resolve('/redux/redux'),
    }
  },
  watch:true,
  watchOptions:{
    ignored:/node_modules/,
    poll:1000,
    aggregateTimeout:600
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: path.resolve(__dirname, "node_modules"),
        query: {
          presets: ["env", "es2015","stage-0","react"]
        }
      },
      {
        test: /\.css$/,
        loader: cssExtract.extract({
          use: ["css-loader"]
        })
      },
      {
        test: /\.less$/,
        loader: lessExtract.extract({
          use: ["css-loader", "less-loader"]
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, "dist")]),
    cssExtract,
    lessExtract,
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "app/plugin"),
        to: path.join(__dirname, "dist/js")
      },
      {
        from: path.join(__dirname, "app/images"),
        to: path.join(__dirname, "dist/public/images")
      }
    ]),
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "index.html",
    })
  ],
  devServer: {
    contentBase:path.join(__dirname),
    host: "localhost",
    port: 8086,
    inline:true,
    compress: true
  }
};
