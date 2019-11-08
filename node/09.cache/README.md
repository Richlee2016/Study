## 起个静态服务器

## 检查文件是否修改 并且发送请求头 第一种方案  撇弃(可能时间修改但内容并未修改)
```
//发给客户端之后 客户端会把此事件保存起来 下次在获取此资源的时候会把这个事件再发挥服务器
<!-- 头发送 -->
res.setHeader('Last-Modified',stat.ctime.toGMTString());

<!-- 头获取 -->
let isModified= req.headers['if-modified-since'];
let lastModified = stat.ctime.toGMTString();
//再比较时间
if(ifModified == LastModified){
    res.writeHead(304);
    res.end('');
}
```

## ETag  实体  MD5
```
<!-- md5 相同输入相同输出 头发送 -->
//fs.readFile(filepath,(err,conten) => {
//    res.setHeader('Etag',crypto.createHash('md5').update(conten).digest('hex'));
//})

const out = fs.createReadStrem(filepath);
const md5 = crypto.createHash('md5');
out.on('data',data => {
    md5.update(data);
})
out.on('end',() => {
    let etag = md5.digest('hex');
})

<!-- 头接收 -->
let ifNoneMatch = req.headers['if-none-match']

if(对比){
    res.writeHead(304)
    res.end('')
};
```

## 强制缓存expires
```
//把资源缓存再客户端 如果客户端再次需要此资源的时候 先获取到缓存中的数据 看是否过期 过期请求服务器
//如果没过期 则不需要请求

<!-- 两个响应头 30s 缓存设置-->
res.setHeader('Expires',new Date(Date.now + 30*1000).toUTCString())  //http1.0 兼容
res.setHeader('Cache-Control','max-age=30')  //http1.1
```

## 自解析
###1.判断是否 为表单上传
```
const cntentType = ctx.headers['content-type']
contentType.includes('multipart')
```


###2.获取截断字符 boundary=xxxxxx
```
let reg = /\bboundary=(.+)/
let sep = "--" + 截取字段
```
###3.异步获取 请求体 promise
```
<!-- buffer的分割 封装 -->

```


