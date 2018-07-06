const fs = require("fs");
const iconv = require("iconv-lite");
//去掉 txt 文件的 BOM 头  
function readText(path){
    const bin = fs.readFileSync(path);
    if(bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF){
        bin = bin.slice(3);
    }
    return bin.tostring('utf-8');
}

//gbk编码的buffer 转  utf-8  字符串 
//iconv-lite （库）
const gbkToUtf = path =>{
    return new Promise((resolve,reject) =>{
        fs.readFile(path,function(err,data){
            if(err) reject(err);
            if(data) resolve(iconv.decode(data,"gbk"));
        })
    })
}