let url = require("url");
let str = 'http://user:rich@localhost:8080/user?id=6#top'
//pathname  query  比较有用
let urlObje = url.parse(str,true)// 第二个参数为 true 的时候 query 解析为对象模式
// console.log(urlObje);
//翻转 format
console.log(url.format(urlObje));