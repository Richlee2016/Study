#webpack

## loader

### babel

### css
```
#css-loader
#style-loader
```


### img
```
#file-loader
file-loader是解析图片地址，把图片从源位置拷贝到目标位置
可以处理任意的二进制 bootstrap 的字体(文件复制))
--------------
1.css 中的bd src 
2.js 中require的 src
==============
{
    test:/\.(png|jpg|gif|svg|bmp)/
    use:{
        loader:'file-loader',
        //规避路径
        options:{
            outputPath:'/images'
        }
    }
}


#webpack-withimg-loader
webpack-withimg-loader 处理html中img src的图片引用地址
--------------
3.html img src
==============
{
    test:/\.(html|htm)/,
    loader:'webpack-withimg-loader'
}

#url-loader
urlloader可以在文件比较小的时候 直接变成base64字符串内嵌到网页中
=============
{
    test:/\.(png|jpg|gif|svg|bmp)/,
    use:{
        loader:'url-loader',
        options:{
            limit:9*1024,
            outputPath:'images/'
        }
    }
}
```