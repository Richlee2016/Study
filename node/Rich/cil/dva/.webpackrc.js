const path = require('path')
module.exports = {
  alias:{
    "@utils":path.resolve(__dirname,'src/utils/'),
    "@ass":path.resolve(__dirname,'src/assets/'),
    "@com": path.resolve(__dirname, 'src/components/')
},
  extraBabelPlugins: [
    ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }]
  ],
  proxy: {
    "/api": {
      target: "http://192.168.136.1:7001/",
      changeOrigin: true,
      pathRewrite: { "^/": "" }
    }
  }
};
