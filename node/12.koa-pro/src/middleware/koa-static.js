const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const mime = require('mime');
const pro = {
    stat:promisify(fs.stat)
};
module.exports = root => async (ctx,next) => {
    let filePath = path.join(root,ctx.path.pathname);
    try {
        const dirObj = await pro.stat(filePath);
        if(dirObj.isDirectory()){

        }else{
            ctx.res.setHeader("Content-Type",mime.getType(filePath));
            ctx.body = fs.createReadStream(filePath);
            return next();
        };
    } catch (error) {
        // ctx.res.statusCode = 404;
        // ctx.body = 'server wrong'
        return next();
    }
}