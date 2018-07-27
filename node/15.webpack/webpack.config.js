const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin")
module.exports = {
  // entry:"./use/main.js"
  // entry: ["./use/main.js","./use/base.js"],
  entry:{
    vender:"./use/vender.js",
    main:"./use/main.js",
    base:"./use/base.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[hash:6].js"
  },
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
        test:/\.css/,
        /**
         * 从右往左 
         * css-loader 处理css中的url路径
         * style-loader 把css文件变成style插入head中
         */
        loader:["style-loader","css-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname,'dist')]),
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "main.html", 
      hash:true,
      // 从右至左的注入
      chunks:["main","vender"],
      minify:{
        removeAttributeQuotes:true
      },
    }),
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "base.html", 
      //会再引入的js里面加入查询字符串避免缓存
      hash:true,
      // 引用的代码块
      chunks:["base","vender"],
      //是否压缩
      minify:{
        //是否去掉 属性的 引号
        removeAttributeQuotes:true
      },
    })
  ],
  // 静态服务器
  devServer:{
    contentBase:'./dist',
    host:'localhost',
    port:8080,
    compress:true//启动gzip
  }
};
