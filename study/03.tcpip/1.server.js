let net = require("net")
//可读可写流 双工流
// 也可以用 server.on("connection",function(){}) 来执行回调
let server = net.createServer({},function (socket) {
    console.log(socket.address());

    socket.setEncoding('utf8');//接收数据  格式

    // server.maxConnections = 2; //客户端连接的总数量
    // 每次有客户端连接 就会触发getConnections 监听函数
    server.getConnections((err,count) => {
        console.log(`欢迎光临，现在的连接数是${count}个`);
    })

    socket.on('data',function(data){
        console.log('数据是:::',data);
    })
    // 没有真正关闭  开始关闭  真正关闭的时候还会触发一个close时间
    socket.on('end',function(){
        console.log('客户端已关闭');
        //服务器端有个 close  如果执行 则 此客户端将不再接收新连接 
        //但也不会关闭现有服务器
        setTimeout(() => {
            // server.close();// 当最后一个 客户端 关闭  服务器也随之关闭
            // server.unref();//与close类似  当所有客户端关闭跟服务器连接后 将关闭服务器
        },10000)
    })

    socket.on('close',function(){
        console.log('客户端真正关闭');
    })
    

    socket.on("error",function(err){
        console.log(err);
    })
})

server.listen(8078,function () {
    console.log(server.address());
    console.log('服务器已经启动');
})

server.on('close',function(hasError){
    console.log('服务器已关闭',hasError);
})

server.on('error',function(err){
    console.log(err);
})