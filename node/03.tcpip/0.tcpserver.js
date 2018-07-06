let net = require('net');
//tcpip 详解 BOOK
let server = net.createServer({},function(socket){
    console.log('客户端已经连接');
    console.log(socket.address());
    socket.on('data',function(data){
        console.log('接收到数据:::',data,1);
        socket.write('服务器确认:' + data);

        socket.on('error',function (err) {
            console.log(err);
        })

        socket.on('end',function () {
            console.log('end');
        })
    })
})

server.listen(8078,function(){
    console.log(server.address());
    console.log('服务器启动成功');
})