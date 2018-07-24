const path = require('path');
const mime = require('mime');
const url = require('url');
const fs = require('fs');
const {promisify} = require("util")
const pro = {
    stat:promisify(fs.stat)
}
module.exports = root => async (ctx,next) => {
    try {
        const {req,res} = ctx;
        const {pathname} = url.parse(req.url);
        const filePath = path.join(root,pathname);
        const fileName = await pro.stat(filePath);
        console.log(pathname);
        if(fileName.isDirectory()){
    
        }else{
            res.setHeader("Content-Type",mime.getType(filePath));
            ctx.body = fs.createReadStream(filePath);
            return next();
        };
    } catch (error) {
        return next();
    }
}