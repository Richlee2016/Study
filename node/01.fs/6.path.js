const path = require("path")

//resolve
//join
//path.delimiter  环境变量路径分隔符
console.log(path.delimiter);
//path.sep  文件路径分隔符
console.log(path.sep);

//relative  获得两个路径之间的相对路径
//basename  aa.jpg  获取到文件名 aa
//extname  aa.jpg   jpg