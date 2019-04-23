// expose-loader 是吧  公用库 打包到一起 并 添加全局变量
require("expose-loader?$!./plugin/jquery.js")
// 如果再loader中 使用了expose-loader 就直接引用
//require("./plugin/jquery.js")
