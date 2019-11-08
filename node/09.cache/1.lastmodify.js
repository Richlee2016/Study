/**
 * 1.第一次访问服务器的时候 服务器返回资源和缓存规则 客户端则把此资源缓存在本地的缓存数据库中
 * 2.第二次客户端需要此数据的时候 要取得缓存的标识 然后去问下服务器我的资源是否最新，
 * 如果是最新则直接使用缓存数据 如果不是则获取新的资源和缓存规则 客户端根据缓存规则 获取
 */

 const http = require('http');
 const url = require('url');
 const path = require('path'); 

 const server = http.createServer();

server.on('request',(req,res) => {
    
})

server.listen(8080,() => {
    
})