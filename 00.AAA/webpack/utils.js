const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

exports.htmlTurn =  () => {
  const files = fs.readdirSync(path.join(__dirname, "app", "views"));
  return files.map(file => {
    return new HtmlWebpackPlugin({
      template: path.join(__dirname,"app","views",file),
      filename: path.join(__dirname,"dist","views",file),
      hash: true,
      chunks: ["common"],
      minify: {
        removeAttributeQuotes: true
      }
    });
  });
};
// const files = fs.readdirSync(path.resolve(__dirname, "app", "views"));
// console.log(files);