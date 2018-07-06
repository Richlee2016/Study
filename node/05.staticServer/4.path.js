const path =  require('path')
let str = '/a/b/c/a.jpg'

console.log(path.basename(str,'.jpg'));  //去掉 .jpg 的文件名
console.log(path.extname(str));