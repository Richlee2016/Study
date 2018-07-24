function Mvvm(opt) {
  this.$options = opt;
  let data = opt.data;
  this.$el = document.querySelector(opt.el || "body");
  this.$methods = opt.methods;
  for(let key in this.$methods){
      this[key] = this.$methods[key];
  }
  this._data = opt.data || {};
  for (let key in data) {
    let val = data[key];
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get() {
        return this._data[key];
      },
      set(newVal) {
        this._data[key] = newVal;
      }
    });
  }

  observe(data);
  Compile(this.$el, this);
}

function Observe(data) {
  let dep = new Dep();
  for (let key in data) {
    let val = data[key];
    observe(val);
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set(newVal) {
        if (val === newVal) return;
        val = newVal;
        dep.notify();
        observe(val);
        return val;
      }
    });
  }
}

function observe(data) {
  if (typeof data !== "object") return;
  return new Observe(data);
}

function Compile(el, vm) {
  let fragment = document.createDocumentFragment();
  let child;
  while ((child = el.firstChild)) {
    fragment.appendChild(child);
  }

  function replace(dom) {
    Array.from(dom.childNodes).forEach(child => {
      let text = child.textContent;
      let reg = /\{\{(.*)\}\}/;
      if (child.nodeType === 3 && reg.test(text)) {
        let arr = RegExp.$1.split(".");
        let val = vm._data;
        arr.forEach(key => {
          val = val[key];
        });
        new Watcher(vm, RegExp.$1, function(newVal) {
          child.textContent = text.replace(reg, newVal);
        });
        child.textContent = text.replace(reg, val);
      }
      if (child.nodeType === 1) {
        let attrs = child.attributes;
        Array.from(attrs).forEach(attr => {
          if (attr.name.indexOf("v-model") !== -1) {
            let exp = attr.value;
            new Watcher(vm, attr.value, function(newVal) {
              child.value = vm[exp];
            });
            child.addEventListener(
              "input",
              function(e) {
                let newVal = e.target.value;
                vm[exp] = newVal;
              },
              false
            );
            child.value = vm[exp];
          }

          if (/v\-on:(.*)/.test(attr.name)) {
            let name = RegExp.$1;
            let mName = attr.value;
            child.addEventListener(name, vm.$methods[mName].bind(vm), false);
          }

        });
        replace(child);
      }
    });
  }

  replace(fragment);
  el.appendChild(fragment);
}

function Dep() {
  this.subs = [];
}

Dep.prototype.addSub = function(sub) {
  this.subs.push(sub);
};

Dep.prototype.notify = function() {
  console.log(this.subs);
  this.subs.forEach(sub => {
    sub.update();
  });
};

function Watcher(vm, exp, fn) {
  this.vm = vm;
  this.exp = exp;
  this.fn = fn;
  Dep.target = this;
  let val = this.vm;
  let arr = this.exp.split(".");
  arr.forEach(key => {
    val = val[key];
  });
  Dep.target = null;
}

Watcher.prototype.update = function() {
  let arr = this.exp.split(".");
  let val = this.vm._data;
  arr.forEach(key => {
    val = val[key];
  });
  this.fn(val);
};
