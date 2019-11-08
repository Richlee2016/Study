const path = require('path');
const debug = require('debug')("static:*");
const config = {
    port:'8080',
    host:'localhost',
    root:path.resolve(__dirname,"..","public")
}
debug(config)
module.exports = config;
