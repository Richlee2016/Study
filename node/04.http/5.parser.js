
/**
 * parser 方法是解析 请求对象，其实就是socket.on("data")
 * 的时候解析出请求头 再传给请求监听函数
 * 
 * curl -v --data "name=rich&age=28" --POST http://localhost:8080
 */

 // Buffer.unshift(buffer);把 多余的 buffer 返回回去
 function parser(){

 }