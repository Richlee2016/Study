/*
 * @Date: 2019-08-19 11:21:02
 * @LastEditors: RichLee
 * @LastEditTime: 2019-08-19 11:21:30
 */
/**
 * DOM事件
 * @author luoying
 * @since 17/06/13
 */
let eventGuid = 0;
const eventHandlers = {};
const eventTargets = {};
function getEventGuid(target) {
  for (const guid in eventTargets) {
    if (eventTargets[guid] === target) {
      return guid;
    }
  }
  const guid = 'events_' + eventGuid++;
  eventTargets[guid] = target;
  return guid;
}
export function on(target, type, handler) {
  if (!target) return;
  const guid = getEventGuid(target);
  if (!eventHandlers[guid]) {
    eventHandlers[guid] = {};
  }
  if (!eventHandlers[guid][type]) {
    eventHandlers[guid][type] = [];
  }
  target.addEventListener(type, handler, false);
  eventHandlers[guid][type].push(handler);
}
export function off(target, type, handler) {
  if (!target) return;
  const guid = getEventGuid(target);
  const events = eventHandlers[guid];
  if (!events) return;
  if (!type) {
    for (const type in events) {
      const handlers = events[type];
      for (const h of handlers) {
        target.removeEventListener(type, h);
      }
    }
    eventHandlers[guid] = {};
    return;
  }
  const handlers = events[type];
  if (!handler) {
    for (const h of handlers) {
      target.removeEventListener(type, h);
    }
    events[type] = [];
    return;
  }
  for (let i = 0; i < handlers.length; i++) {
    const h = handlers[i];
    if (h === handler) {
      target.removeEventListener(type, h);
      handlers.splice(i, 1);
      break;
    }
  }
}
export function addEventsToDocument(eventMap) {
  Object.keys(eventMap).forEach(key => {
    document.addEventListener(key, eventMap[key], false);
  });
}
export function removeEventsFromDocument(eventMap) {
  Object.keys(eventMap).forEach(key => {
    document.removeEventListener(key, eventMap[key], false);
  });
}
export function targetIsDescendant(target, parent) {
  let node = target;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
// 绑定多个事件，只执行一次
export function addListenerOnce(el, s, fn) {
  addListenerMulti(el, s, e => {
    fn.call(el, e);
    removeListenerMulti(el, s, fn);
  });
}
// 绑定多个事件
export function addListenerMulti(el, s, fn) {
  s.split(' ').forEach(e => el.addEventListener(e, fn, false));
}
// 解绑多个事件
export function removeListenerMulti(el, s, fn) {
  s.split(' ').forEach(e => el.removeEventListener(e, fn, false));
}
/**
 * 自定义事件器
 * @class EventEmitter
 */
export class EventEmitter {
  constructor() {
    /**
     * 最近发布的一条消息
     */
    this.lastEmittedEvents = {};
    /**
     * 事件处理器
     */
    this.eventHandlers = {};
  }
  /**
   * 注册自定义事件
   *
   * @param {string} type 事件类型
   * @param {(evt: any) => void} handler 事件处理器
   * @param {boolean} [delayOn=false] 是否延迟订阅
   * @returns
   * @memberof EventEmitter
   */
  on(type, handler, delayOn = false) {
    if (!type || !handler) {
      return;
    }
    let handlers = this.eventHandlers[type];
    if (!handlers) {
      handlers = this.eventHandlers[type] = [];
    }
    // 相同的事件不会触发多次
    if (handlers.indexOf(handler) >= 0) return;
    // 注册回调事件
    handlers.push(handler);
    // 对于延迟订阅者，需要立即发布一次最近发布的消息
    if (delayOn) {
      const lastEmittedEvent = this.lastEmittedEvents[type];
      lastEmittedEvent && handler(lastEmittedEvent);
    }
  }
  /**
   * 注销自定义事件
   * @param {string} [type] 事件类型
   * @param {(evt: any) => void} [handler] 事件处理器，当不指定时，表示注销所有该类型的自定义事件
   * @memberof EventEmitter
   */
  off(type, handler) {
    if (!type) {
      return this.offAll();
    }
    if (!handler) {
      this.eventHandlers[type] = [];
      return;
    }
    const handlers = this.eventHandlers[type] || [];
    for (let i = 0; i < handlers.length; i++) {
      const hd = handlers[i];
      if (hd === handler) {
        handlers.splice(i, 1);
        break;
      }
    }
  }
  /**
   * 注销所有自定义事件
   * @memberof EventEmitter
   */
  offAll() {
    this.lastEmittedEvents = {};
    this.eventHandlers = {};
  }
  /**
   * 派发自定义事件
   * @param {string} type 事件类型
   * @param {any} evt 任意事件数据
   * @memberof EventEmitter
   */
  fire(type, evt) {
    if (!type) return;
    // 发布消息给当前所有订阅者
    const handlers = this.eventHandlers[type] || [];
    for (const handler of handlers) {
      handler(evt);
    }
    // 缓存最新的消息
    this.lastEmittedEvents[type] = evt;
  }
}
/**
 * 唯一的全局自定义事件器对象
 */
export const globalEvent = new EventEmitter();
