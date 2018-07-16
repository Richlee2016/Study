function Mvvm(opt) {
  this.$options = opt || {};
  let data = (this._data = opt.data || {});

  observe(data);
  /**
   * 222222.数据代理
   */
  //把 this._data 挂载到this上  数据代理
  for (let key in data) {
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get() {
        return this._data[key];
      },
      set(newVal) {
        this._data[key] = newVal;
      }
    });
  }
  initComputed.call(this);//777777
  new Compile(opt.el, this);
}

/**
 * 111111.数据劫持
 */
function Observe(data) {
  let dep = new Dep(); //555555 连接视图
  for (let key in data) {
    let val = data[key];
    // 嵌套object 劫持
    observe(val);
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get() {
        Dep.target && dep.addSub(Dep.target); ///555555 连接视图 发布
        return val;
      },
      set(newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        //修改新值的时候 如果是 object 也需要劫持
        observe(val);
        // 555555 连接视图  让所有的watcher 执行
        dep.notify();
      }
    });
  }
}

/**
 * 333333.编译模板
 */
function Compile(el, vm) {
  vm.$el = document.querySelector(el);
  let fragment = document.createDocumentFragment(); //创建文本碎片
  let child;
  //把节点逐一放入 内存碎片
  while ((child = vm.$el.firstChild)) {
    fragment.appendChild(child);
  }
  //渲染数据
  function replace(dom) {
    Array.from(dom.childNodes).forEach(function(node) {
      var text = node.textContent; //获取文本内容
      var reg = /\{\{(.*)\}\}/;
      if (node.nodeType !== 3 && reg.test(text)) {
        let arr = RegExp.$1.split(".");
        let val = vm;
        arr.forEach(function(key) {
          val = val[key];
        });
        // if(typeof val === 'object'){
        //     val = JSON.stringify(val);
        // }
        // 替换的逻辑
        //555555 连接视图
        new Watcher(vm, RegExp.$1, function(newVal) {
          //需要接受一个 新值
          node.textContent = text.replace(reg, newVal);
        });
        node.textContent = text.replace(reg, val);
      }
      //   666666 双向绑定
      if (node.nodeType === 1) {
        let nodeAttrs = node.attributes;
        Array.from(nodeAttrs).forEach(function(attr){
            let name = attr.name;
            let exp = attr.value;
            if(name.indexOf('v-') === 0){
                let str = name.replace(/v-/,"");
                if(str === 'model'){
                    node.value = vm[exp];
                    new Watcher(vm,exp,function(newVal){
                        node.value = vm[exp];
                    })
                    node.addEventListener('input',function(e){
                        let newVal = e.target.value;
                        vm[exp] = newVal;
                    },false)
                };
            };
        })
      }
      // 多层 节点
      if (node.childNodes) {
        replace(node);
      }
    });
  }
  replace(fragment);

  //把渲染之后得节点 再放回
  vm.$el.appendChild(fragment);
}

function observe(data) {
  if (typeof data !== "object") {
    return;
  }
  return new Observe(data);
}

/**
 * 444444  发布订阅模式
 */
function Dep() {
  this.subs = [];
}

//bbbbbb=>发布这个函数
Dep.prototype.addSub = function(sub) {
  this.subs.push(sub);
};

//cccccc=>触发这个函数
Dep.prototype.notify = function() {
  this.subs.forEach(sub => sub.update());
};

// Watcher  就是 上方 添加进入数组的sub  只是 watcher有个 update方法

//aaaaaa=>订阅 一个 fn 函数
//从 vm 和 表达式exp中获取新的值 传给fn
function Watcher(vm, exp, fn) {
  this.fn = fn;
  this.vm = vm;
  this.exp = exp;
  //添加到订阅之中
  Dep.target = this;
  let val = this.vm;
  let arr = this.exp.split(".");
  arr.forEach(function(key) {
    val = val[key]; //会调用到 劫持的时候的get 方法  ===》  Dep.target 传过去
  });
  Dep.target = null;
}

Watcher.prototype.update = function() {
  let val = this.vm;
  let arr = this.exp.split(".");
  arr.forEach(function(key) {
    val = val[key]; //会调用到 劫持的时候的get 方法  ===》  Dep.target 传过去
  });
  this.fn(val);
};

// 777777
function initComputed(){
    let vm = this;
    let computed = this.$options.computed;

    Object.keys(computed).forEach(key => {
        Object.defineProperty(vm,key,{
            enumerable:true,
            configurable:true,
            get:typeof computed[key]=== 'function'?computed[key]:computed[key].get,//不太懂
            set(){}
        })
    })
}
