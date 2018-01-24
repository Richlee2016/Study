// 订阅发布
class Event {
  constructor() {
    this.List = {};
    this.group = [];
  }
  add(key){
    this.group.push(key);
  }
  // 监听
  listen(key, fn) {
    if (!this.List[key]) {
      this.List[key] = [];
    }
    this.List[key].push(fn);
  }
  // 触发
  trigger(...arg) {
    const [key, ...fnArg] = arg;
    if (!this.List[key]) return;
    this.List[key].forEach(o => {
      o(...fnArg);
    });
  }
  // 移除
  remove(key, fn) {
    if (!this.List) return;
    if (!fn) {
      this.List[key] = [];
    } else {
      const i = this.List[key].indexOf(fn);
      this.List[key].splice(i, 1);
    }
  }
}

export default new Event();
