const fs = require("fs");
const rs = fs.createReadStream('test/pipe1.txt',{
    highWaterMark:3
})
const ws = fs.createWriteStream('test/pipe2.txt',{
    highWaterMark:3
})
//pipe 的原理
//当监听可读流data时间的时候会触发回调函数的执行
//可以实现数据的生产者和消费者速度的均衡
//tcp http 网络层

// rs.on('data',data => {
//     console.log(data);
//     let flag = ws.write(data);
//     if(!flag){
//         rs.pause();
//     };
// })

//监听可写流缓存区清空事件 当所有要写入的数据写入完成后 接着回复从可读流里读取并触发data事件
//所有 缓存区的 东西清理 触发
// ws.on('drain',() =>{
//     console.log('drain');
//     rs.resume();
// })

ws.on('pipe',src =>{
    console.log('pipe');
    console.log(src);
})
rs.pipe(ws); //建立一个管道
rs.unpipe(ws); //移出目标可写流 销毁管道