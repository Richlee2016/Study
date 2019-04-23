const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
console.log( path.resolve(__dirname,'Loader'));
module.exports = {
  entry: {
    index: "./Loader/index.js"
  },
  output: {
    path: path.join(__dirname, "Loader","dist"), 
    filename: "[name].js"
  },
  // 配置查找loader的目录
  resolveLoader:{
    modules:[
      'node_modules',
      path.resolve(__dirname,'Loader')
    ]
  },
  //优化
  resolve:{
    extensions:[".js"],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: path.resolve(__dirname, "node_modules"),
        query: {
          presets: ["env", "es2015"]
        }
      },
      // {
      //   test:/\.html?$/,
      //   loader:'html-layout-loader',
      //   options:{
      //     layout:path.resolve(__dirname,'Loader/Layout.html'),
      //     placeholder:'{{__content__}}',
      //     decorator:'layout'
      //   }
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "Loader/index.html",
      filename: "index.html",
    })
  ]
};
