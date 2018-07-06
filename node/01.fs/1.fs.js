const fs = require("fs");
const { resolve } = require("path");

const p = path => resolve(__dirname, path);

const readFS = (url, flag = "r+") => {
  return new Promise((resolve, reject) => {
    fs.readFile(url, { encoding: "utf8", flag }, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

//mode linux 权限位
// chmod 777
//appendFile  追加  同 writeFile flag=‘a’
const writeFS = (url, data, flag = "w") => {
  return new Promise((resolve, reject) => {
    fs.writeFile(url, data, { encoding: "utf8", flag, mode: 0o666 }, function(err) {
      if (err) {
          reject(err);
      }else{
          resolve(data);
      }
    });
  });
};

//他们都是把文件当成一个整体来操作的
//当文件特别大的，大于内存的是无法执行这样的操作的

const getTxt = async () => {
  const res = await readFS(p("../file/test.txt"));
  // const write = await writeFS(p("./file/write.txt"),"很强","a");
//   console.log(res);
};
getTxt();

//处理大文件
//把文件当成一个整体来操作
//当文件特别大的，我们需要精确的控制读取的字符
//file dispacriptor 文件描述符
//0 标准输入  1.标准输出  2.错误输出

//标准输入
// process.stdin.on("data", function(data) {
//   console.log(data);
// });
//标准输出
// process.stdout.write('good') 

/**
 * r 读取
 * w 写并清空
 * r+ 读取和写  写精确的位置  并不清空
 * a 追加
 */

const openFS = (url) => {
    fs.open(url, "w", 0o666, function(err, fd) {
      console.log("fd",fd);
      let buff = Buffer.alloc(4);
      /*文件 buffer 写入索引 从文件中读取几个字节 文件读取位置
      从 fd 文件中拿到  字符 存入 buff
      如果 不给位置  就会记录当前指针位置 一直往后读取*/
    //   fs.read(fd,buff,0,3,null,function(err,bytesRead){
    //     console.log('buff',buff.toString());
    //     fs.read(fd,buff,3,1,null,function(err,bytesRead){
    //         console.log("buff",buff.toString());
    //     })
    //   })

    /**
     * buffer偏移量
     * 读3个直接
     * 写入索引
     */
    fs.write(fd,Buffer.from('珠峰'),3,3,0,function(err,bytesWritten){
      console.log(bytesWritten);
      if(err){
            console.log(err);
        }
        //强行把缓存区的数据写入文件 并且清除关闭
      fs.fsync(fd,err => {
        fs.close(()=>{
          console.log("关闭文件");
        }) 
      })  
       
    })
    });
};

//监视文件的变化 有个监控时间断点
// fs.watchFile(path,listener);
//fs.unwatchFile 
fs.watchFile('.test',(preStat,newStat) =>{
  console.log(preState,newStat);
  if(Date.parse(preState.ctime)){
    //新增的文件
  }else if(Date.parse(preStat.ctime) !== Date.parse(newStat.ctime)){
    //文件被修改了
  }else if(Date.parse(newStat.ctime) === 0){
    //被删除了
  }
})

//大文件分写
(async ()=>{
    const res = openFS(p("../file/open.txt"));
})();



