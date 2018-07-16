function Dep(){
    this.subs = [];
}

//bbbbbb=>发布这个函数
Dep.prototype.addSub = function(sub){
    this.subs.push(sub);
}


//cccccc=>触发这个函数
Dep.prototype.notify = function(){
    this.subs.forEach(sub => sub.update());
}

// Watcher  就是 上方 添加进入数组的sub  只是 watcher有个 update方法

//aaaaaa=>订阅 一个 fn 函数  
function Watcher(fn){
    this.fn = fn;
}

Watcher.prototype.update = function(){
    this.fn();
}

let watcher = new Watcher(function(){
    console.log(1);
})

let dep = new Dep();
dep.addSub(watcher);
setTimeout(() => {
    dep.notify();
}, 3000);
