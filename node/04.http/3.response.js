let http = require("http");
// 如何向客户端 写入相应信息
/**
 * @响应体
 * HTTP/1.1 200 OK  响应行
 *
 * Date:Fri, 02 Feb 2018 13:57:46 GMT   响应头
 * Connection:keep-alive //网络连接 常连接
 * Content-Length:9 //头 响应体的长度
 *
 * name=zfpx 响应体
 * Transfer-Encoding: chunked 分块传输
 */
const server = http.createServer(function(req, res) {
    console.log('request');
  //设置 所有的响应
  //writeHead 调用之后 会立刻向客户端 发送  但setHeader 不会立刻发送
  //行 体 头
  res.writeHead(200, {
    "Content-Type": "text/html;charset=utf8"
  });
  //是否已经发送 响应
  console.log("headerSent=>>>", res.headersSent);
  // console.log('客户端连接');
  // res.statusCode = 200; //行 的响应码
  // res.sendDate = false;//头 Date 响应头默认会设置 如果不想要 就 false 取消
  // res.setHeader('Content-Type','text/html;charset=utf8');
  // console.log("header=>>>",res.getHeader('Content-Type'));
  // res.removeHeader('Content-Type');
  // console.log('remove=>>>',res.getHeader('Content-Type'));
  // //res 流写入
  // res.write('hello');
  // res.write('world');
  // res.end(); //可写流 结束之后  不可再次写入
});

server.on("connection", function(socket) {
    console.log('connection');
  socket.on("close", function() {
    console.log("close");
  });
  socket.on("end", function() {
    console.log("end");
  });
});

server.on("close", function() {
  console.log("服务器已关闭");
});

server.listen(8080);
