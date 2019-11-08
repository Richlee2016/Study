/**
 * 可写流
 */

let fs = require("fs");

//写入缓存区 缓存区满了之后 再写入
let ws = fs.createWriteStream("test/stream2.txt", {
  flags: "w",
  mode: 0o666,
  start: 0,
  highWaterMark: 3
});

//  ws.on('open',()=>{
//      console.log('open');
//  });

//flag 如何缓冲区已满 返回 false  否则 true
//如返回false 就不能写了
//如果返回false 后 继续写入 就放入 内存区  待的 缓存区清空再从内存拿出
let flag = ws.write("1");

flag = ws.write("2");
console.log(flag);
flag = ws.write("3"); //false
console.log(flag);
flag = ws.write("4"); //false
console.log(flag);

ws.on("drain", () => {
  console.log("drain");
});

ws.end("结束\n");

ws.on("finish", () => {
  console.log("所有的都已经写入");
});
ws.on("close", () => {
  console.log("close");
});
