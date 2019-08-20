/*
 * @Date: 2019-08-19 11:37:32
 * @LastEditors: RichLee
 * @LastEditTime: 2019-08-20 09:29:24
 */
import { EventEmitter } from './utils/events';
import clone from './utils/clone';
// 总事件
export const eventTypes = {
  index: {
    ADD_NUM: 'ADD_NUM',
    CHANGE_TITLE: 'CHANGE_TITLE',
  },
  son: {
    CHANGE_TITLE: 'CHANGE_TITLE',
  },
  grandson: {
    BOX_NUM: 'BOX_NUM',
  },
};

// 事件名称总类型
type EventTypes = typeof eventTypes;
// 组件前缀类型
type EventKey = keyof EventTypes;

class EventBus extends EventEmitter {
  // 获取所有事件名称
  getAllType() {
    let temTypes: Record<string, any> = clone(eventTypes, true);
    for (let key of Object.keys(eventTypes)) {
      let keyStr = key as EventKey;
      const innerType = eventTypes[keyStr];
      for (const [ke, value] of Object.entries(innerType)) {
        temTypes[keyStr][ke] = `${keyStr.toLocaleUpperCase()}_${value}`;
      }
    }
    return temTypes as EventTypes;
  }

  // 添加组件事件前缀
  getType<T>(prefix: EventKey) {
    const types = eventTypes[prefix];
    let temTypes: Record<string, any> = clone(types, true);
    for (let [key, val] of Object.entries(types)) {
      temTypes[key] = `${prefix.toLocaleUpperCase()}_${val}`;
    }
    return temTypes as T;
  }

  // 按需求卸载事件
  groupOff(names: string[]) {
    names.forEach(name => {
      this.off(name);
    });
  }

  // 按组件卸载事件
  typeOff(prefix: EventKey) {
    const eventType = eventTypes[prefix];
    const types = this.getType<typeof eventType>(prefix);
    for (const type of Object.values(types)) {
      this.off(type);
    }
  }
}

export const eventBus = new EventBus();
