import _ from 'lodash'
import glob from 'glob'
import path from 'path'
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
/** glob 读取 文件路径 */
export const globAsync = (path) => new Promise((resolve, reject) => {
  glob(path, function (err, file) {
    if (err) reject(err)
    resolve(file)
  })
})
/** 绝对路径转换器 */
export const rePath = (...p) => path.resolve(__dirname, ...p)
