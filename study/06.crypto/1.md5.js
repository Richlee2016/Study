/**
 * 1.可以用来检验下载得文件是否被改动过
 * 2.对密码进行加密 12345 =》 MD5值
 */

 let crypto = require('crypto');
 let str = 'hello'
//  console.log(crypto.getHashes());
//md5 32  sha1 40
 const md5 = crypto.createHash('sha1')

 md5.update('hello')//自动要加密的值
 md5.update('world')//再次添加要加密的值
 console.log(md5.digest('hex'));//输出MD5值 制定输出的格式 hex 十六进制

 /**
  * 当客户端访问服务器的时候 服务器有可能会返回一个响应头 Content-Md5
  * 这个值就是响应体 md5 值
  */