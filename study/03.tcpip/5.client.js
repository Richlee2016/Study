let net = require('net')
//起一个客户端  api 与 起服务端 类似
let client = new net.Socket();

client.connect(8080,"localhost",function(){
    client.write('hellow');
});
client.setEncoding('utf8')
client.on('data',function(data){
    console.log(data);
})

setTimeout(() => {
    //要求关闭与服务器的连接
    client.end();
}, 1000*10);