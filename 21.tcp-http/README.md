# tcp/http

## header

```
# Content-Type
--------------------------------------
    常见的媒体格式类型如下：

    text/html ： HTML格式
    text/plain ：纯文本格式      
    text/xml ：  XML格式
    image/gif ：gif图片格式    
    image/jpeg ：jpg图片格式 
    image/png：png图片格式

   以application开头的媒体格式类型：

   application/xhtml+xml ：XHTML格式
   application/xml     ： XML数据格式
   application/atom+xml  ：Atom XML聚合格式    
   application/json    ： JSON数据格式
   application/pdf       ：pdf格式  
   application/msword  ： Word文档格式
   application/octet-stream ： 二进制流数据（如常见的文件下载）
   application/x-www-form-urlencoded ： <form encType=””>中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）
   另外一种常见的媒体格式是上传文件之时使用的：

    multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式
```

## 跨域
```
# server 
设置 header
'Access-Control-Allow-Origin':'*'
或者
'Access-Control-Allow-Origin':'http/:192.168.14.22:8026' //只能设置一个值 (可以根据地址来动态设置)

# jsonp 在标签上 添加 server 地址
<srcipt src="http://test.com"></script>
```

## 预请求 CORS  就是对请求 方法 请求头 以及 content-type 的预请求验证 通过验证后 接下来的请求才安全

```
# 会有一些 默认的 请求方法 丨 请求头 丨 Content-Type  不然 报错

# 设置 允许的 请求头  请求方法
'Access-Control-Allow-Origin':'X-Test-Cors'
'Access-Control-Allow-Mthods':'POST,PUT,Delete'
'Access-Control-Max-Age':'1000'  //在这个请求中 以这种方式进行请求的 允许时间  在1000S 内不用进行预请求验证
```

## 缓存 Cache-Control

```
# max-age  到期时间
'Cache-Control' = 'max-age=20000000, no-cache'
```

## 资源验证
```
'Cache-Control' = 'max-age=20000000, no-cache',
'Last-Modified':'123',
'Etag':'777'
```

## 长连接
```
# 一般浏览器会创建 6 个tcp连接 如果 网速够快 可以 复用tcp连接
'Connection':'keep alive' //默认
'Connection':'close'  //关闭
```

## 数据协商
```
# 客户端
Accept:'text/html' //文件类型
Accept-Encoding:'gizp' //传输的格式  压缩
Accept-Language:'zh-CN' //语言
User-Agent //客户端的一些信息

# 服务端
Content-Type
Content-Encoding
Content-Language

# 预测 要返回的类型
'X-Content-Type-Options':'nosniff'
```

## 重定向
```
# 跳转到 /new
# 如果 status 使用301  则永久定向  直接访问/new(一直读取客户端 内存)
response.writeHead(302,{
    'Location':'/new'
})

```

## 内容安全策略
```
# 再MDN  搜索 csp  详解
# 可再html 中用meta 标签写
response.writeHead(200,{
    'Content-Security-Policy':'default-src http: https:' //禁止使用 script 行内js
    'Content-Security-Policy':'default-src \"self\" http:\\www.rich.cn' //禁止外链
    'Content-Security-Policy':'default-src \"self\"; from-action \"self\" ' //禁止表单发送外链
    'Content-Security-Policy':'default-src \"self\"; from-action \"self\"; report-uri /report' //向report 发送策略汇报 
    'Content-Security-Policy-Report-Only':'default-src \"self\"; from-action \"self\"; report-uri /report' //只做报告不做限制
})
```