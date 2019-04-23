### koa-better-body 获取文件的 解析请求体的中间件
```
//convert 可以把generator中间件转成一个koa2中间件
const convert = require('koa-convert')
app.user(covert(bodyParser({
    uploadDir:path.join(__dirname,'uploads'),
    keepExtensions:true
})))

ctx.request.fileds
```

### form 中有上传文件 需要添加
```
<form method="POST" enctype="multipart/form-data"></form>
```