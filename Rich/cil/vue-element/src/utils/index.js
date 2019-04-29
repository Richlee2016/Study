const localStorage = window.localStorage
/**
 * 定时缓存 设置
 * @param {string} key
 * @param {any} value
 * @param {'d' | 'h' | 'm' | 's'} default 's' 时间类型
 */
export const setCache = (key, value, time, type = 's') => {
  switch (type) {
    case 'd':
      time = time * 24 * 60 * 60 * 1000
      break
    case 'h':
      time = time * 60 * 60 * 1000
      break
    case 'm':
      time = time * 60 * 1000
      break
    case 's':
      time = time * 1000
      break
  }
  const meta = {
    update: Date.now(),
    expires: time
  }
  try {
    localStorage.setItem(key, JSON.stringify({ meta, value }))
  } catch (error) {
    throw new Error('储存错误')
  }
}
/**
 * 定时缓存 获取
 * @param {*} key
 */
export const getCache = (key) => {
  const now = Date.now()
  const item = JSON.parse(localStorage.getItem(key))
  if (!item) return null
  const { meta: { update, expires }, value } = item
  if ((now - update) > expires) {
    localStorage.removeItem(key)
    return null
  } else {
    return value
  }
}
