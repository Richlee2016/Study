//分配一个长度为6个直接的buffer
//会把所有的直接设置为0
//可以提供默认值
let buf1 = Buffer.alloc(6);
console.log(buf1);

//分配一块没有初始化的内存
let buf2 = Buffer.allocUnsafe(60);
console.log(buf2);

let buf3 = Buffer.from("你好");
console.log(buf3);

let buf4 = Buffer.alloc(4);
console.log(buf4);
//填充的值  填充开始的索引  结束索引
buf4.fill(3,1,3);
console.log(buf4);

//写入字符串 填充索引  填充直接长度
let buf5 = Buffer.alloc(6);
buf5.write("你好",0,3,'utf8')
console.log(buf5);

//向指定的索引写入一个8位得整数
let buf6 = Buffer.alloc(6);
buf6.writeInt8(0,0);
buf6.writeInt8(16,1)
buf6.writeInt8(32,2)
console.log(buf6);