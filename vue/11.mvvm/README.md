# mvvm

[toc]

---

### Object.defineProperty
```
let obj = {}
//如果有get 或者 set  则不能又 writable 和 value 属性
Object.defineProperty(obj,'name',{
    configurable:true, //默认 false 可配置（是否可以删除）
    <!-- writable:true, // 默认false 可写(是否可改) -->
    enumberable:true,//默认false 可枚举
    <!-- value:'rich'， -->
    get(){
        return 'rich'
    },
    set(val){
        console.log(val)
    }
})
```

### 数据劫持
```

let data ={a:1}



```

### 数据代理
```
把this._data 挂载到 this上

```

### 模板编译

```
//创建 文档碎片
```

### 发布订阅
```

```

### 连接视图 ***
```
a.订阅一个更新函数
b.添加到队列
c.触发订阅函数的更新机制

oberver 劫持数据
compile 编译模板（订阅更新函数 new Watcher）在第一次视图渲染的时候 就触发了new Watcher  进行了数据监听 
watcher 监听函数(触发oberver get 把watcher 添加进入dep队列 )
数据更改 (触发 set 进行dep队列 update)



1.在视图更新的时候  订阅一个 更新函数  需要更新的新值  函数是没有触发的
//vm 是同步刷新的
new Watcher(vm, RegExp.$1, function(newVal) {
    //需要接受一个 新值
    node.textContent = text.replace(reg, newVal);
});
2.在Watcher中触发 observer的 get 函数 并把watcher 记录在Dep.target 中
Dep.target = this;
let val = this.vm;
  let arr = this.exp.split(".");
  arr.forEach(function(key) {
    val = val[key]; //会调用到 劫持的时候的get 方法  ===》  Dep.target 传过去
});
Dep.target = null;
3.在observer的get方法中 添加订阅的函数 
Dep.target && dep.addSub(Dep.target);

4.在observer 的 set方法中 添加发布
dep.notify();

5.notify() 中再计算修改的值  进行  新增添加 最后触发 第一步中的订阅函数
```

### 双向绑定


### computed 可以缓存 只是把数据挂载了vm上


