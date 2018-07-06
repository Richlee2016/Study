//http 服务器是继承tcp服务器 http协议是应用层协议 是基于 TCP的
let http = require('http')
let url = require('url')
//req 流对象 是可读流
//res 流对象 是可写流

let server = http.createServer();

//当客户端连接上服务器之后执行回调
server.on('connection',function(socket){
    console.log("客户端已连接");

})

//服务器监听客户端的请求，当有请求到来的时候执行回调
//req 代表客户端的连接 server服务器把客户端的请求信息进行解析 然后放在req
//res 代表响应 如果希望向客户端回应消息 需要通过res
server.on('request',function(req,res){
    console.log(req.method);//方法
    let urlObj = url.parse(req.url);
    console.log(urlObj);//路径
    console.log(req.headers);//请求头对象
    // 请求体 是一个 流对象
    let result = [];
    req.on("data",function(data){
        result.push(data);
    })
    req.on('end',function(){
        let r = Buffer.concat(result);//请求体
        console.log(r.toString());
        res.end(r);
    })
})

server.on('close',function(){
    console.log('服务器关闭');
})

server.on('error',function(err){
    console.log(err);
})

server.listen(8080,function(){
    console.log("服务器启动 8080");
})