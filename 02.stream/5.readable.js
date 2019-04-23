let fs = require('fs')
let rs = fs.createReadStream('./test/readable.txt',{
    highWaterMark:3
});


rs.on('readable',()=>{
    let ch = rs.read(1);
    console.log(ch);
    //当读了一个字节后 发现只剩下2个  不够 highWaterMark 会再次读取highWaterMark 个字填到缓存区
    setTimeout(() => {
        console.log(rs._readableState.length);  //5
    },200)
})
