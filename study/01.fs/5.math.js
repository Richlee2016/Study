const fs = require('fs')
/**
 * 同步深度优先+先序遍历
 */
const deepSync = dir => {
  fs.readdirSync(dir).forEach(file => {
    let child = path.join(dir,file);
    let stat = fs.statSync(child);
    if(stat.isDirectory()){
      deepSync(child);
    }else{
      console.log(child);
    }
  })
}
/**
 * 异步的深度优先遍历
 */

 const preDeep = dir => {

 }

 /**
  *  同步的广度优先遍历
  */