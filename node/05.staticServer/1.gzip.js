const fs =  require('fs');
const path = require('path')
const zlib = require('zlib');

//用于实现压缩
function gzip(src){
    fs.createReadStream(src)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(src+'.gz'));
}
//压缩
// gzip(path.join(__dirname,'../test/gizp.txt'));
//basename 从一个路径中获取文件名 可以传一个扩展名字符参数 去掉扩展名 path.basename(src,'.gz') 去掉.gz
//extname 获取扩展名
function gunzip(src){
    fs.createReadStream(src)
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(path.join(__dirname,path.basename(src,'.gz'))))
}
gunzip(path.join(__dirname,'../test/gizp.txt.gz'))