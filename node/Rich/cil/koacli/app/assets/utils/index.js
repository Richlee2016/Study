import _ from 'lodash'
/** 转化 字符串数字 */
export const setNum = data => {
  if (!_.isObject(data)) return data
  for (let [key, val] of Object.entries(data)) {
    if (!isNaN(val)) {
      data[key] = Number(val)
    }
    if (_.isObject(val)) {
      setNum(val)
    }
  }
  return data
}
