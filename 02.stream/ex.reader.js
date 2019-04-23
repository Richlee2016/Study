/**
 * 行读器
 */
let EventEmitter = require('events');
let fs = require('fs');
const NEW_LINE = 0x0A;//换行 /n 
const RETURN = 0x0D; //回车 /r   mac \r  win\r\n  linux \n
class LineReader extends EventEmitter{
    constructor(path,encode){
        super();
        this.encode = encode || 'utf8';
        this.rs = fs.createReadStream(path);
        //当给一个对象添加一个新的监听函数的时候 会触发 newListener
        this.on('newListener',(type,listener) => {
            if(type == 'newLine'){
                let buffers = []
                this.rs.on("readable",() =>{
                    let char;
                    while(null != (char = this.rs.read(1))){
                        switch (char[0]) {
                            case NEW_LINE:
                                this.emit(type,Buffer.from(buffers).toString(this.encode))
                                buffers.length = 0;
                                break;
                            case RETURN:
                                this.emit(type,Buffer.from(buffers).toString(this.encode));
                                buffers.length = 0;
                                let nChar = this.rs.read(1);
                                if(nChar[0] != NEW_LINE){
                                    buffers.push(nChar);
                                };
                                break;
                            default:
                                buffers.push(char[0]);
                                break
                        }
                    }
                })
                this.rs.on('end',()=>{
                    this.emit('newLine',Buffer.from(buffers).toString(encode));
                    buffers.length = 0;
                    this.emit('end','over')
                })
            }
        })
    }
}

const line = new LineReader('./test/reader.txt');
line.on('newLine',data => {
    console.log(data);
});
line.on('end',over => {
    console.log(over);
})