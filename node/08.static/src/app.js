const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const chalk = require('chalk');
const debug = require('debug')('static:*');
const config = require('./config');
const mime = require('mime');
const {promisify,inspect} = require('util');
const stat = promisify(fs.stat)
const nunjucks = require('nunjucks');

class Server {
    constructor(){
        this.server = http.createServer();
        this.start();
    }

    start(){
        this.server.on('request',this.request.bind(this));
       
        this.server.listen(config.port,() => {
            debug(`server is start on ${chalk.green(config.port)}`);
        });
    }

    async request(req,res){
        const {pathname} = url.parse(req.url);
        const filepath = path.join(config.root,pathname);
        try {
            const statObj = await stat(filepath);
            if(statObj.isDirectory()){
                
            }else{
                this.sendFile(req,res,filepath,statObj);
            };
        } catch (error) {
            debug(util.inspect(error));
            this.sendError(req,res);
        }
    }

    sendError(req,res){
        res.dtatusCode = 500;
        res.end("wrong in server");
    }

    sendFile(req,res,filepath,statObj){
        res.setHeader('Content-Type',mime.getType(filepath));
        fs.createReadStream(filepath).pipe(res);
    }

    _tmp(data){
        return nunjucks.render(path.resolve(__dirname,"../public","tmp.html"),data);
    }
}

const server = new Server();