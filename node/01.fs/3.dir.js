const fs = require("fs");
const { p } = require("../utils");
const pathj = require("path")
//当创建目录得时候必须 父级存在
// fs.mkdir('./fs/dir',function(err){
//     console.log(err);
// })

// 判断文件或目录是否存在
// fs.access('./fs',fs.constants.R_OK,function(err,data){
//     if(err === null){
//         fs.mkdir('./fs/yes',function(err){
//             console.log(err);
//         })
//     };
// })

//递归异步创建目录 mkdirp
const mkdir = url => {
  const urlArr = url.split("/");
  return new Promise((resolve, reject) => {
      let n = 1;
      let msg = "创建成功";
      const next = i => {
        const dirUrl = urlArr.slice(0,i+1).join("/");
        if(urlArr.length-1 < i) {
            resolve(msg);
            return;
        };
        fs.access(dirUrl,fs.constants.R_OK,function(err,data){
            if(!err){
                if(urlArr.length-1 === i ){
                    msg = `${dirUrl}已经存在`;
                };
                next(n+=1);
            }else{
                fs.mkdir(dirUrl,function(err){
                    console.log(`创建文件夹${dirUrl}`);
                    next(n+=1);
                })
            };
        })
      }
      next(n);
  });
};

//递归删除 文件 
/**
 * fs.unlink  删除文件
 * fs.rmdir 删除文件夹 一定是个 空的目录
 * fs.stat(path,(err,state) => {
 *  state.isDirectory 文件夹
 * }) 文件状态 (区分是文件夹还是 文件 )
 */
const rmdir =url => {
   
}


//读文件夹
const readDIR = path =>{
    fs.readdir(path,(err,files) =>{
        console.log(files);
        files.forEach(o =>{
            const child = pathj.join(path,o)
            //文件的详细状态  stat statSync
            fs.stat(child,(err,stat) => {
                console.log(stat);
            }); 
        })
    })
}

//重命名
fs.rename()
//truncate 截断文件

fs.truncate(path,5,() => {})

(async () =>{
    // const res = await mkdir("./a/b/d/t");
    // const res = await rmdir("./a/b/d");
})();
