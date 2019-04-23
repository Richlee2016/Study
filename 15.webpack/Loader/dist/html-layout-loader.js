const path = require('path');
const fs = require('fs');
const loaderUtils= require('loader-utils');
let defaultOptions = {
    placeholder:'{{__content__}}'
}
module.exports = function(source){
    let callback = this.async();
    let options = loaderUtils.getOptions(this);
    options = {...defaultOptions,...options};
    let {layout,placeholder,decorator} = options;
    let reg = new RegExp(`@${decorator}\\((.+))\\`);
    let matched = source.match(reg);
    if(matched){
        // this.context  读取文件的路径(Loader)
        // fs.readFile(path.join(this.context,matched[1],'utf8',(err,html) => {
        //     html = html.replace(placeholder,source);
        //     callback(err,`module.exports = ${JSON.stringify(html)}`);
        // })
    }else{
        fs.readFile(layout,'utf8',(err,html) => {
            html = html.replace(placeholder,source);
            callback(err,`module.exports = ${JSON.stringify(html)}`);
        })
    };
    return source;
}