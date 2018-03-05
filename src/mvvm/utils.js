export const isObject = obj => Object.prototype.toString.call(obj) === "[object Object]"? true : false;
export const isFn = obj => Object.prototype.toString.call(obj) === "[object Function]"? true : false;
