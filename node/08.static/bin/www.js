// -d --root 静态文件目录 -o --host 主机 -p --port 端口号
//npm link   将本文件 中的bin 之下的命令添加到  npm 的环境变量中  会指向到
const yargs = require('yargs');
const argv = yargs.options('d',{
    alias:'root',
    demand:'false',
    type:'string',
    default:process.cwd(),
    description:'静态文件目录'
}).options('o',{
    alias:'host',
    demand:'false',
    type:'string',
    default:'localhost',
    description:'主机地址'  
}).options('p',{
    alias:'port',
    demand:'false',
    type:'number',
    default:8080,
    description:'端口号'
})
.usage('rich-server [options]')
.example(
    'rich-server -d / -p 8888 -o localhost',
    '在本机8888上监听客户端请求'
)
.help('h')
.argv;