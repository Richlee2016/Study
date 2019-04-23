
class Koa {
    constructor(){

    }

    listen(port,opt){
        this.server = http.createServer();
    }

}
module.exports = Koa;