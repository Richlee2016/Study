const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
let cssExtract = new ExtractTextWebpackPlugin("css/css.css");
let lessExtract = new ExtractTextWebpackPlugin("css/less.css");
module.exports = {
  entry: {
    main: "./use/main.js"
  },
  output: {
    path: path.join(__dirname, "dist"), 
    filename: "[name].[hash:6].js"
  },
  //优化
  resolve:{
    extensions:[".js",".json"],
    // 减小搜索的范围
    modules:['node_modules']
    // 配置第三方模块使用的入口文件
    // 在文件夹中先找main文件 再找 browser文件
    // mainFilelds:["main","browser","node"]
  },
  module: {
    //不需要递归解析次模块  因为已经压缩
    noParse:[/react\.production\.min\.js/],
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        // 只转化src中的文件
        include:path.join(__dirname,'./use'),
        //排除
        exclude: path.resolve(__dirname, "node_modules"),
        query: {
          presets: ["env", "es2015",'react']
        },
      },
      {
        test: /\.css$/,
        loader: cssExtract.extract({
          use: ["css-loader?minimize"]
        })
      },
      {
        test: /\.less$/,
        loader: lessExtract.extract({
          use: ["css-loader?minimize", "less-loader"],
        })
      },
      {
        test: /\.(html|htm)/,
        loader: "html-withimg-loader"
      },
      {
        test: /\.(png|jpg|gif|svg|bmp)/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            outputPath: "./images"
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, "dist")]),
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "main.html",
      hash: true,
      chunks: ["main"],
      minify: {
        removeAttributeQuotes: true
      }
    }),
    cssExtract,
    lessExtract,
  ],
  // 静态服务器
  devServer: {
    contentBase: "./dist",
    host: "localhost",
    port: 8080,
    compress: true //启动gzip
  }
};
