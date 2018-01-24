import Observe from "./observer";
import Event from "./event";
import Watcher from "./watcher"
// import Compile from "./compile"
export default class MVVM {
  constructor(options) {
    this.$opt = options;
    this.$data = this.$opt.data;
    this.$eve = Event;
    let b = this.$data.box + 2;
    this.init();
  }

  init() {
    for (let [key, val] of Object.entries(this.$data)) {
      this._proxyData(this, key, val);
    }
    Observe(this.$data, this);
    console.log(this.$data.box);
    new Watcher(this);
    this.$data.box = 2;
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
