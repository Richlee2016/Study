/**
 * 订阅-发布(观察者)模式
 */
const listen = Symbol("listen");
const trigger = Symbol("trigger");
const remove = Symbol("remove");
const create = Symbol("create");
export default class PubSub {
  constructor() {
    this.namespace = {};
    this.defaultName = "default";
  }

  [listen](key, fn, cache) {
    if (!cache[key]) {
      cache[key] = [];
    }
    cache[key].push(fn);
  }

  [trigger](cache, ...arg) {
    const [key, ...fnArg] = arg;
    if(cache[key]){
      cache[key].forEach(fn => {
        fn(...fnArg);
      });
    };
  }

  [remove](key, fn, cache) {
    if (cache[key]) {
      if (!fn) {
        cache[key] = [];
      } else {
        const i = cache[key].indexOf(fn);
        cache[key].splice(i, 1);
      }
    } else {
      cache[key] = [];
    }
  }

  [create](namespace) {
    let name = namespace || this.defaultName;
    let cache = this.namespace[name] ? this.namespace[name].cache : {};
    this.namespace[name] = {
      cache
    };
    return {
      listen: (key, fn) => {
        return this[listen](key, fn, cache);
      },
      trigger: (...arg) => {
        return this[trigger](cache, ...arg);
      },
      remove: (key, fn) => {
        return this[remove](key, fn, cache);
      }
    };
  }

  create(namespace) {
    return this[create](namespace);
  }
  listen(key, fn) {
    return this[create]().listen(key, fn);
  }

  trigger(...arg) {
    return this[create]().trigger(...arg);
  }

  remove(key, fn) {
    return this[create]().remove(key, fn);
  }
}
