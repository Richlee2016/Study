/*
 * @Date: 2019-08-19 11:37:32
 * @LastEditors: RichLee
 * @LastEditTime: 2019-08-19 18:13:32
 */
import { EventEmitter } from './utils/events';
import clone from './utils/clone';

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

class EventBus extends EventEmitter {
  // 获取所有时间名称
  getAllType() {
    let temTypes: Record<string, any> = clone(eventTypes, true);
    for (let key of Object.keys(eventTypes)) {
      let keyStr = key as keyof typeof eventTypes;
      const innerType = eventTypes[keyStr];
      for (const [ke, value] of Object.entries(innerType)) {
        temTypes[keyStr][ke] = `${keyStr.toLocaleUpperCase()}_${value}`;
      }
    }
    return temTypes as typeof eventTypes;
  }

  // 添加组件 事件前缀
  getType<T>(prefix: keyof typeof eventTypes) {
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
  typeOff(prefix: keyof typeof eventTypes) {
    const eventType = eventTypes[prefix];
    const types = this.getType<typeof eventType>(prefix);
    for (const type of Object.values(types)) {
      this.off(type);
    }
  }
}

export const eventBus = new EventBus();
