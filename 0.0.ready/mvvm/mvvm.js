const OBSERVER = Symbol('observer')
const COMPILE = Symbol('compile')
const HANDLEDOM = Symbol('handle-dom')
const WATCH = Symbol('watch')
export default class Mvvm {
  constructor (opt) {
    this.$opt = opt
    this.$el = document.querySelector(opt.el || 'body')
    const data = opt.data
    this.$methods = opt.methods || {}
    this.$watch = opt.watch || {}
    this.$data = data || {}
    for (let [key, val] of Object.entries(this.$methods)) {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get: () => {
          return this.$methods[key].bind(this)
        },
        set: (newVal) => {}
      })
    }

    for (let [key, val] of Object.entries(data)) {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get: () => {
          return this.$data[key]
        },
        set: (newVal) => {
          if (newVal === val) return
          this.$data[key] = newVal
        }
      })
    }

    this[OBSERVER](data)
    this[COMPILE](this.$el)
  }

  [OBSERVER] (data) {
    if (typeof data !== 'object') return
    for (let [key, val] of Object.entries(data)) {
      this[OBSERVER](val)
      let dev = new Dev()
      Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get () {
          if (Dev.target) {
            // console.log('add',Dev.target);
            dev.addSub(Dev.target)
          };
          return val
        },
        set: (newVal) => {
          if (newVal == val) return
          val = newVal
          this[OBSERVER](newVal)
          dev.notify()
        }
      })
    }
  }

  [COMPILE] (el) {
    let fragment = document.createDocumentFragment()
    let child
    while (child = el.firstChild) {
      fragment.appendChild(child)
    }
    this[HANDLEDOM](fragment.childNodes)
    el.appendChild(fragment)
  }

  [HANDLEDOM] (nodes) {
    Array.from(nodes).forEach(node => {
      // console.log(node,node.nodeType);
      const reg = /\{\{(.+)\}\}/
      const text = node.textContent

      if (node.nodeType == 3 && reg.test(text)) {
        let data = getData(RegExp.$1, this.$data)
        node.textContent = text.replace(reg, data)
        new Watcher(this, RegExp.$1, newVal => {
          node.textContent = text.replace(reg, newVal)
        })
      };

      if (node.nodeType == 1) {
        const attrs = node.attributes
        Array.from(attrs).forEach(attr => {
          const reg = /v\-(.+)/
          const attrReg = /v\-(.+):(.+)/
          if (reg.test(attr.name)) {
            const type = RegExp.$1
            const val = getData(attr.value, this.$data)
            if (attrReg.test(attr.name)) {
              const name = RegExp.$2
              node.setAttribute(name, val)
              new Watcher(this, attr.value, newVal => {
                node.setAttribute(name, newVal)
              })
            };
            if (RegExp.$1 == 'model') {
              node.value = val
              new Watcher(this, attr.value, newVal => {
                node.value = newVal
              })
              node.addEventListener('input', e => {
                let newVal = e.target.value
                console.log(attr.value, newVal)
                this[attr.value] = newVal
              }, false)
            };
            if (RegExp.$1 === 'on') {
              const method = RegExp.$2
              const fn = this[attr.value]
              node.addEventListener(method, fn, false)
            }
            node.removeAttribute(attr.name)
          }
        })
      };
      if (node.childNodes) {
        this[HANDLEDOM](node.childNodes)
      };
    })
  }
}

class Dev {
  constructor () {
    this.subs = []
  }

  addSub (sub) {
    this.subs.push(sub)
  }

  notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

class Watcher {
  constructor (vm, exp, fn) {
    this.fn = fn
    this.vm = vm
    this.exp = exp
    Dev.target = this
    let data = getData(exp, vm) // 触发 get  subadd 添加watcher
    Dev.target = null
  }

  update () {
    let newVal = getData(this.exp, this.vm) // 更改之后 取新的值
    let watch = this.vm.$watch
    if (watch) {
      watch[this.exp](newVal)
    }
    this.fn(newVal)
  }
}

// a.c 循环获取值
function getData (regStr, data) {
  let arr = regStr.split('.')
  let _data = data
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i]
    _data = _data[el]
  }
  return _data
}
