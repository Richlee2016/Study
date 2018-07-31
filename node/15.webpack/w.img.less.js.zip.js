const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
// 有时候我们希望把页面中的css文件单独拉出来保存加载
// cnpm install extract-text-webpack-plugin@next -D
let ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
let cssExtract = new ExtractTextWebpackPlugin("css/css.css");
let lessExtract = new ExtractTextWebpackPlugin("css/less.css");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin")
module.exports = {
  entry: {
    main: "./use/main.js"
  },
  output: {
    path: path.join(__dirname, "dist"), 
    filename: "[name].[hash:6].js"
  },
  // 监控源文件的变化  如果 改变则重新打包
  // watch:true,
  // watchOptions:{
  //   ignored:/node_modules/,
  //   poll:1000,//每秒钟询问的次数
  //   aggregateTimeout:500//延迟500MS 没有动作才进行修改
  // },
  /**
   * 错误定位处理  pro 的时候添加定位
   * source-map  //单独文件 可以定位到那一列出错
   * cheap-module-source-map //单独文件 体积更小 但只能定位哪一行出错
   * eval-source-map //不会生成单独文件 会在文件底部加上
   * cheap-module-eval-source-map //不生成单独文件  自定位到行
   */
  resolve:{
    // 引入文件的时候 不用加 后缀
    extensions:["",".js",".json"],
    // 别名
    alias:{}
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: path.resolve(__dirname, "node_modules"),
        query: {
          presets: ["env", "es2015"]
        }
      },
      {
        test: /\.css$/,
        // loader: ["style-loader", "css-loader"]
        // 此插件先用css-loader 处理一下css
        loader: cssExtract.extract({
          use: ["css-loader?minimize"]
        })
      },
      {
        test: /\.less$/,
        // loader: ["style-loader", "css-loader", "less-loader"],
        loader: lessExtract.extract({
          // 压缩
          use: ["css-loader?minimize", "less-loader"],
        })
      },
      // img 的三种引入处理方式
      // 1.复制文件
      // 2.把css中的bd img src 转化
      // {
      //   test: /\.(png|jpg|gif|svg|bmp)/,
      //   use: {
      //     loader: "file-loader",
      //     //规避路径
      //     options: {
      //       outputPath: "./images"
      //     }
      //   }
      // },
      // 3.把html中的 img src 转化
      {
        test: /\.(html|htm)/,
        loader: "html-withimg-loader"
      },
      // 可以在文件比较小的时候 直接变成base64支付串
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
    // 压缩js
    new UglifyjsWebpackPlugin(),
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
    new CopyWebpackPlugin([{
      from:path.join(__dirname,'public'),
      to:path.join(__dirname,'dist/public')
    }])
  ],
  // 静态服务器
  devServer: {
    contentBase: "./dist",
    host: "localhost",
    port: 8080,
    compress: true //启动gzip
  }
};
