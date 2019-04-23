/**
 * 1.Readable 可读流
 * 2.Writable 可写流
 * 3.Dupiex 可读写流
 * 4.Transform 在读写过程中可以修改和变化数据的Duplex流
 *
 * 二进制模式和对象模式
 *
 * 可读流的两种模式  flowing (水阀放水)   paused（水管吸水 ）
 */

const fs = require("fs");
const rs = fs.createReadStream("test/pipe1.txt", {
  highWaterMark: 3
});

const ws = fs.createWriteStream("test/flow2.txt", {
  highWaterMark: 3
});
//flow 模式  不进行缓存  直接发射
// rs.on("data", data => {
//   console.log(data);
// });

// rs.on("end", () => {
//   console.log("end");
// });
//当你监听readable事件的时候 会进入暂停模式
//可读流会马上去向底层读取文件然后把文件放在缓存区
rs.on('readable',() => {
    console.log(rs._readableState.length);  //缓存区数据的大小
    let a = rs.read(3)//读取一个字节  如果可读流发现你要读的字节小于等于缓存大小  直接返回
    console.log(a);
})
