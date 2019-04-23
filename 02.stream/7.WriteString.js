/**
 * 自写 可写流 
 */
let fs = require('fs')
let EventEmitter = require("events")
class WriteStream extends EventEmitter {
    constructor(path,opt){
        super()
        this.path = path;
        this.flags = opt.flags || 'w';
        this.mode = opt.mode || 0o666;
        this.start = opt.start || 0;
        this.pos = this.start;
        this.encoding = opt.encoding || 'utf8';
        this.autoClose = opt.autoClose;
        this.highWaterMark = opt.highWaterMark || 16*1024
        this.buffers = [];//缓存区
        this.writing = false;//表示内部正在写入数据
        this.length = 0;//缓存区字节的长度
        this.open();
    }

    open(){
        //打开文件
        fs.open(this.path,this.flags,this.mode,(err,fd) => {
            // 1.错误 关闭文件 并触发错误
            if(err){
                if(this.autoClose){
                    this.destroy();
                };
                this.emit('error',err);
            }
            // 2 没有报错 进行赋值
            this.fd = fd;
        })
    }
    // 如果底层已经在写入数据 则必须当前要写入的数据放在缓存区里
    write(chunk,encoding,cb){
        if(this.writing){//表示正在向底层写数据 则当前数据必须放在缓存区里

        };
    }

    // 关闭 文件 并处触发 close
    destroy(){
        fs.close(this.fd,()=>{
            this.emit('close');
        })
    }
}