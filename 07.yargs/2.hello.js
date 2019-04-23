//yargs 
/**
 * 
 * 如果是 mac  需要加个  chmod +x h
 
 * 
 */
const yargs = require('yargs');
//node xxxx --a b   
// argv.a ==> b
// let argv = yargs.argv;
// console.log(argv);

let argv = yargs.options('n',{
    alias:'name',//别名
    demand:true,//必填
    default:'zfpx',
    description:"请输入你的姓名"
})
.usage("help [options]")
.help()
.example("help -name zfpx","执行hello命令，然后传入name参数")
.alias('h','help')
.argv

console.log(argv);

