# 前端性能优化方案

[toc]

---

# 常用图片优化方案

1.雪碧
2.base64
3.字体图标
4.SDK
5.未来方案
```
# picture 标签
<picture></picture>

#新的图像格式
```

# 视频优化方案

1.video
2.flash 
--视频文件资源 会后置到最后 加载 所以视频显示比较慢
3.js前置:让视频第一时间显示 
4.资源提前:利用 <link> 标签 引入视频文件 会提前加载 并且会缓存


# 缓存方案
1.sessionStorage localStoreage
2.userData（ie服务的）
3.Cookie
4.openDatabase

# 通用缓存SDK
1.网络交互
2.本地存储
3.缓存展示

```
localStorage  溢出异常  err.name == 'QuotaExceededError'

```

# dom 高性能
1.Reflow 计算 位置  ===重绘
2.repaint  绘制 特性 === 回流



