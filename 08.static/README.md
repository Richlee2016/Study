## 静态文件服务器
可以在任意目录下启动一个静态文件服务器，并且把首目录作为文件根目录
```
rich-server -d 制定静态文件根目录 -p 自定端口号 -o 自定监听的主机
```

```
//命令行中的命令指向了 npm 目录bat文件 而bat文件又指向了当前目录得 www 文件
```

## 步骤
### package.json
```
bin:{
    "server":"bin/www"
}
```
### www 文件
```
//头添加  启用node 命令
#!/usr/bin/env node

```

### 书写 服务器 app （Numjucks 模板render path问题 待处理）

### yargs 书写命令行

### npm link 连接命令

