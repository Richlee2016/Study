/**
 * 创建一个静态服务器
 */
const http = require('http');

 class Server {
     constructor(){
         this.server = http.createServer();
         this.server.on('request',this.handleRequest.bind(this))
     }

     handleRequest(req,res){
         res.end('2');
     }

     listen(port,opt){
        this.server.listen(port,function(){
            console.log(`server on port ${port}`);
        });
         
     }
 }

 module.exports = Server;