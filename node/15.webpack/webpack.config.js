const path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: path.resolve(__dirname, "node_modules"),
        include: path.resolve(__dirname, "src"),
        query: {
          presets: ["env", "es2015", "react"]
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html", 
      template: "./index.html"
    })
  ]
};
