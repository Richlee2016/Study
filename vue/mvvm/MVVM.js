// 监视数据
import Dev from './Dev'
const OBSERVER = Symbol('observer') // 数据劫持
const COMPILE = Symbol('compile')// 编译碎片
const HANDLEDOM = Symbol('handle-dom')// 渲染数据
class Mvvm {
  constructor (opt) {
    this.$el = document.querySelector(opt.el)
    this._data = opt.data || {}
    this._methods = opt.methods || {}
    this._computed = opt.computed || {}
    // computed 实现
    for (const [key, val] of Object.entries(this._computed)) {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get () {
          return typeof val === 'function' ? val.call(this) : val.get
        },
        set (newVal) {}
      })
    }
    // 2.挂载
    for (const [key, val] of Object.entries(this._data)) {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get () {
          return this._data[key]
        },
        set (newVal) {
          if (newVal === val) return
          this._data[key] = newVal
        }
      })
    }
    this[OBSERVER](this._data)
    this[COMPILE](this.$el)
  }

  //   1.劫持数据
  [OBSERVER] (data) {
    if (typeof data !== 'object') return
    for (let [key, val] of Object.entries(data)) {
      const dev = new Dev()
      if (typeof val === 'object') {
        this[OBSERVER](val)
      }
      Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get () {
          if (Dev.target) {
            dev.addSub(Dev.target)
          }
          return val
        },
        set: (newVal) => {
          if (newVal === val) {
            return
          }
          val = newVal
          this[OBSERVER](newVal)
          dev.notify()
        }
      })
    }
  }

  // 3.编译碎片
  [COMPILE] (el) {
    let f = document.createDocumentFragment()
    let child = el.firstChild
    while (child) {
      f.appendChild(child)
      child = el.firstChild
    }
    this[HANDLEDOM](f.childNodes)
    el.appendChild(f)
  }

  // 4.渲染数据
  [HANDLEDOM] (nodes) {
    Array.from(nodes).forEach(node => {
      const type = node.nodeType
      if (type === 1) {
        // 属性处理
        let val = node.attributes
        Array.from(val).forEach(o => {
          node.removeAttribute(o.name)
          let val = _loop(o.value, this._data)
          if (/v-bind:(.+)/.test(o.name)) {
            let keyv = o.name.match(/v-bind:(.+)/)[1]
            new Watcher(this, o.value, newVal => {
              node.setAttribute(keyv, newVal)
            })
            node.setAttribute(keyv, val)
          } else if (/v-model/.test(o.name)) {
            new Watcher(this, o.value, newVal => {
              node.setAttribute('value', newVal)
            })
            node.setAttribute('value', val)
            node.addEventListener('input', e => {
              this[o.value] = e.target.value
            }, false)
          } else if (/v-on:(.+)/.test(o.name)) {
            let metKey = o.name.match(/v-on:(.+)/)[1]
            node.addEventListener(metKey, this._methods[o.value].bind(this), false)
          }
        })
      } else if (type === 3) {
        let text = node.textContent
        if (/\{\{(.+)\}\}/.test(text)) {
          const te = RegExp.$1
          new Watcher(this, te, newVal => {
            console.log(newVal)
            node.textContent = newVal
          })
          node.textContent = _loop(te, this)
        }
      }
      // 内容处理
      if (node.childNodes.length) {
        this[HANDLEDOM](node.childNodes)
      }
    })
  }
}

// 5.添加 监听
class Watcher {
  constructor (vm, exp, fn) {
    this.vm = vm
    this.exp = exp
    this.fn = fn
    Dev.target = this
    _loop(exp, this.vm._data) // 关键一步  触发data  进行 函数监听
    Dev.target = null
  }
  update () {
    let newVal = _loop(this.exp, this.vm)
    this.fn(newVal)
  }
}

const _loop = (word, data) => {
  let arr = word.split('.')
  return arr.reduce((val, o) => {
    val = val[o]
    return val
  }, data)
}

export default Mvvm
