const path = require("path");
module.exports = {
  entry: {
    main: "./use/main.js"
  },
  output: {
    path: path.join(__dirname, "dist"), 
    filename: "[name].[hash:6].js"
  },
  module: {
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
      }
    ]
  },
  plugins: [
    
  ]
};
