/**
 * 可读流
 */
let fs = require("fs");

//通过创建一个可读流
let rs = fs.createReadStream("./test/stream1.txt", {
  //缓存区大小 3字节
  highWaterMark: 3,
  flags: "r",//操作
  mode: 0o666,//相位
  start: 3,//开始 包括开始索引位置
  end: 8,//结束  包括结束索引位置
  encoding:'utf8'
});

//监听 data 时间 一旦开始监听data时间的时候 流就开始读并且发射data
//缓存64k
rs.on("open", () => {
  console.log("打开");
  rs.pause();//暂停读取和发射data事件
  console.log('已暂停');
  setTimeout(()=>{
      rs.resume(); //回复读取和发射
      console.log('恢复');
  },3000)
});

// rs.setEncoding('utf-8');//修改流编码

rs.on("data", data => {
  console.log(data);
});

rs.on("end", () => {
  console.log("结束");
});

rs.on("error", err => {
  console.log(err);
});

rs.on("close", () => {
  console.log("关闭");
});
