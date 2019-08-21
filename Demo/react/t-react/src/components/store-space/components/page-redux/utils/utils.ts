/*
 * @Date: 2019-08-19 10:34:06
 * @LastEditors: RichLee
 * @LastEditTime: 2019-08-19 10:38:42
 */
export function actionsMap<T>(actions: T, names: Array<keyof T>) {
  let myActions: Partial<T> = {};
  names.forEach(name => {
    myActions[name] = actions[name];
  });
  return myActions;
}
