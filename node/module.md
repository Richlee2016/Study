
##Buffer

### iconv-lite      gbk 的buffer 转 utf-8
### string_decoder（node自带）  把 buffer 转成字符串 可以保证不乱码(流的 分行读取 等等)

## 静态服务器 与 命令行
### yargs 命令行工具

### chalk  命令行颜色主题

### debug
```
//每个debug 实例都有一个名字  是否再控制台打印取决于环境变量中DEBUG的值是否等于 static:app
let debug = require('debug')('static:*')
<!-- process.env.DEBUG = "static:*" -->
//mac linux下是 
export DEBUG=static:*
```

### supervisor  管家
```
npm i supervisor -g
````
