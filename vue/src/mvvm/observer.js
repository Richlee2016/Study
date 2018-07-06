import { isObject } from "./utils";
const myObserver = Symbol("myObserver")
// 监听数据
class Observer {
  constructor(data, vm) {
    this.data = data;
    this.eve = vm.$eve;
    this.init();
  }

  init() {
    if (!isObject(this.data)) return;
    for (let [key, val] of Object.entries(this.data)) {
      observer(val);
      this[myObserver](this.data, key, val);
    }
  }

  [myObserver](obj, key, val) {
    Object.defineProperty(obj, key, {
      enumerable: true,
      defineProperty: false,
      get: () => {
        //   通知 需要监听的值
        this.eve.add(key);
        return val;
      },
      set: newVal => {
        if (!newVal || newVal === val) return;
        val = newVal;
        if (isObject(newVal)) {
          observer(val);
        }
        //通知 event 触发 已经监听的值
        this.eve.trigger("notify");
      }
    });
  }
}

function observer(data, vm) {
  if (!data || !isObject(data)) return;
  return new Observer(data, vm);
}

export default observer;
