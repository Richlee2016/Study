/**
 * http 客户端
 * 1.爬虫
 * 2.node中间层
 */

const http = require("http");
//头分四中 通用头 请求头 响应头 实体头
let options = {
  host: "localhost",
  port: 8080,
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};
// 请求并没有发出 req 为可写流
let req = http.request(options);

req.on('response',function(res){
    console.log(res.statusCode);
    console.log(res.headers);
    let result = [];
    res.on('data',function(data){
        result.push(data);
    })
    res.on('end',function(data){
        let str = Buffer.concat(result);
        console.log(str.toString());
    })
})

req.write("name=zfpx");
// 结束写入请求体 只有在调用end的时候才会正真向服务器发送请求
req.end();
