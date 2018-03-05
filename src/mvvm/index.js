import Observe from "./observer";
import Event from "./event";
import Watcher from "./watcher"
import Compile from "./compile"

/**
 * 1.Oberverf 劫持所有属性 并添加到 Dep
 * 2.Dep 通知变化 给 Watcher Watcher 对Dep中的属性进行监听 添加  订阅
 * 3. Watcher 通知 Dep 中的属性 进行发布
 */

export default class MVVM {
  constructor(options) {
    this.$opt = options;//设置
    this.$data = this.$opt.data;//数据
    this.$eve = Event;//订阅-发布
    // let b = this.$data.box + 2;
    this.$compile={}; //指令解析 库
    this.init();//开始
  }

  init() {
    for (let [key, val] of Object.entries(this.$data)) {
      this._proxyData(this, key, val);
    }
    Observe(this.$data, this);//劫持数据 并 订阅
    // console.log(this.$data.box);
    new Watcher(this);//检查数据变化 通知  发布
    this.$data.box = 2;
    this.$compile = new Compile(document.querySelector(this.$opt.el)||document.body,this); 
  }

  // 把data 挂载到 this 上
  _proxyData(obj, key, val) {
    Object.defineProperty(obj, key, {
      entries: true,
      defineProperty: false,
      get: function getter() {
        return this.$data[key];
      },
      set: function setter(newVal) {
        // this.$data[key] = newVal;
        // return newVal;
      }
    });
  }

  _initComputed() {}
}
