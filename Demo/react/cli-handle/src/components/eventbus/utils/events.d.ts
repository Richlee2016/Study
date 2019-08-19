/*
 * @Date: 2019-08-19 11:21:20
 * @LastEditors: RichLee
 * @LastEditTime: 2019-08-19 11:21:20
 */
/**
 * DOM事件
 * @author luoying
 * @since 17/06/13
 */
export declare function on(
  target: EventTarget,
  type: string,
  handler: (evt: Event) => void
): void;
export declare function off(
  target: EventTarget,
  type?: string,
  handler?: (evt: Event) => void
): void;
export declare function addEventsToDocument(
  eventMap: Record<string, (evt: Event) => void>
): void;
export declare function removeEventsFromDocument(
  eventMap: Record<string, (evt: Event) => void>
): void;
export declare function targetIsDescendant(target: Node, parent: Node): boolean;
export declare function addListenerOnce(
  el: EventTarget,
  s: string,
  fn: (evt: Event) => void
): void;
export declare function addListenerMulti(
  el: EventTarget,
  s: string,
  fn: (evt: Event) => void
): void;
export declare function removeListenerMulti(
  el: EventTarget,
  s: string,
  fn: (evt: Event) => void
): void;
/**
 * 自定义事件器
 * @class EventEmitter
 */
export declare class EventEmitter {
  /**
   * 最近发布的一条消息
   */
  lastEmittedEvents: Record<string, any>;
  /**
   * 事件处理器
   */
  eventHandlers: Record<string, Array<(evt: any) => void>>;
  /**
   * 注册自定义事件
   *
   * @param {string} type 事件类型
   * @param {(evt: any) => void} handler 事件处理器
   * @param {boolean} [delayOn=false] 是否延迟订阅
   * @returns
   * @memberof EventEmitter
   */
  on(type: string, handler: (evt: any) => void, delayOn?: boolean): void;
  /**
   * 注销自定义事件
   * @param {string} [type] 事件类型
   * @param {(evt: any) => void} [handler] 事件处理器，当不指定时，表示注销所有该类型的自定义事件
   * @memberof EventEmitter
   */
  off(type?: string, handler?: (evt: any) => void): void;
  /**
   * 注销所有自定义事件
   * @memberof EventEmitter
   */
  offAll(): void;
  /**
   * 派发自定义事件
   * @param {string} type 事件类型
   * @param {any} evt 任意事件数据
   * @memberof EventEmitter
   */
  fire(type: string, evt: any): void;
}
/**
 * 唯一的全局自定义事件器对象
 */
export declare const globalEvent: EventEmitter;
