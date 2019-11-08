/**
 * 1.http客户端
 * 2.压缩和加密
 *
 * http 与 tcp 服务器的关系
 * req和res 都是从socket来的 先监听socket的data事件 然后等事件发生的时候
 * 进行解析 解析出请求头对象 再创建请求对象 再根据请求对象创建响应对象
 */
const qs = require('querystring');
const fs = require('fs');
const http = require("http");

const server = http.createServer();

server.on("request", function(req, res) {
  console.log(req.url);
  console.log(req.method);
  let result = [];
  req.on("data", function(data) {
    console.log(data);
    result.push(data);
  });
  req.on("end", function() {
    let str = Buffer.concat(result).toString();
    let contentType = req.headers["content-type"];
    let body;
    if (contentType === "application/json") {
      body = JSON.parse(str);
    } else if (contentType === "application/x-www-form-urlencoded") {
      body = qs.parse(str);
    }else{
        body = qs.parse(body);
    }
    console.log(body);
    res.end(JSON.stringify(body));
  });
});

server.listen(8080);
