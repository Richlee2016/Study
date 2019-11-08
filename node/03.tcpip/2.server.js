// resume pause

let net = require("net")
let path = require("path")
console.log(path.resolve(__dirname,"../test/socket.txt"));
let ws = require("fs").createWriteStream(path.resolve(__dirname,'../test/socket.txt'))
//socket 代表跟客户端的连接

 let server = net.createServer(function(socket){
     socket.pause(); //暂停读写数据  等待输入完成3秒之后 写入
     //设置客户端的超时时间 如果客户端一直不输入超过一定时间就认为超时了
     socket.setTimeout(1000*3)
     socket.on('timeout',function(){

         socket.pipe(ws,{end:false}); //写完之后 自动关闭  end:false 写完之后 不自动关闭流
     })
 })
 server.listen(8087,function(){
     console.log(server.address());
     console.log('已经连接');
 });