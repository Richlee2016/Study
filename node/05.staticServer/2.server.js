
const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const {promisify} = require('util');
const mime = require('mime');
const zlib = require('zlib');
//把一个异步方法转成一个 promise方法
let stat = promisify(fs.stat);
/**
 * 客户端想服务端发起请求的时候  解压缩的格式
 * Accept-Encoding:gizp, deflate 压缩
 */
const server = http.createServer(async function(req,res){
    let {pathname}  = url.parse(req.url);
    let filepath = path.join(__dirname,pathname);
    try {
        let statObj = await stat(filepath);
        //可以根据不同的文件内容类型返回不同的Content-Type  
        res.setHeader("Content-Type",mime.getType(pathname))
        //为了兼容不同的浏览器  node 把所有的请求头全部转成了小写
        let acceptEncoding = req.headers['accept-encoding']
        if(acceptEncoding){
            if(acceptEncoding.match(/\bgzip\b/)){
                //服务器高数 客户端 我用什么压缩方法压缩了
                res.setHeader('Content-Encoding','gzip')
                fs.createReadStream(filepath).pipe(zlib.createGzip()).pipe(res);
            }else if(acceptEncoding.match(/\bdeflate\b/)){
                fs.createReadStream(filepath).pipe(zlib.createDeflate()).pipe(res);
            }else{
                fs.createReadStream(filepath).pipe(res);
            }
        }
    } catch (error) {
        res.statusCode=404;
        res.end();
    }
})

server.listen(8080);