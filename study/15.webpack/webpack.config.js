const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
let HellowPlugin = require("./Plugin/Hellow")
module.exports = {
  entry: {
    index: "./Plugin/index.js"
  },
  output: {
    path: path.join(__dirname, "Plugin","dist"), 
    filename: "[name].js"
  },
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
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: "Loader/index.html",
    //   filename: "index.html",
    // })
    new HellowPlugin({name:'rich'})
  ]
};
