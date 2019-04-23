/** 内置中间件 */
import { reqLoggerMiddleware } from '../middlewares/logger'
import { isFunction as _isFun } from 'lodash'
const mids = [
  /** 请求日志 */
  {
    name: '@log',
    mid: reqLoggerMiddleware
  }
]

export const initMiddleware = (ms) => {
  mids.forEach(o => {
    let index = ms.indexOf(o.name)
    if (index !== -1) {
      ms[index] = o.mid
    }
  })
  let unUseMid = ms.filter(o => !_isFun(o))
  if (unUseMid.length > 0) {
    throw new Error(`unuseless middlewares ${unUseMid}`)
  }
  return ms.filter(o => _isFun(o))
}
