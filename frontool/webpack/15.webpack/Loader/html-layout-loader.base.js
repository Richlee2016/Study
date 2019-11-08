const path = require('path');
const fs = require('fs');
/**
 * layout模板路径
 * layout模板内容
 * source 替换占位符
 */
const loaderUtils= require('loader-utils');
let defaultOptions = {
    placeholder:'{{__content__}}'
}
// 最后一个loader 必须要返回一个js模块  callback 中 导出 module.exports
module.exports = function(source){
    // loader 为 异步
    let callback = this.async();
    // 拿去配置
    let options = loaderUtils.getOptions(this);
    // 覆盖默认
    options = {...defaultOptions,...options};
    let {layout,placeholder} = options;
    fs.readFile(layout,'utf8',(err,html) => {
        html = html.replace(placeholder,source);
        callback(err,`module.exports = ${JSON.stringify(html)}`);
    })
    return source;
}