import { logger } from '../middlewares/logger'
import config from '../../../config/config.default'
import request from 'request-promise-native'
// import { client } from '../middlewares/redis'
/**
 * server ctx 注入
 * <--- 方法 --->
 * sayInfo 普通日志
 * sayError 错误日志
 * redis reids操作
 * */
export const serverInjectable = {
  config,
  axios: request,
  sayInfo: logger,
  sayError: err => logger('error').error(err)
  // redisClient: client
}
