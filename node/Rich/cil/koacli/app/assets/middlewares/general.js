import bodyparser from 'koa-bodyparser'
import session from 'koa-session'
import json from 'koa-json'
import koaStatic from 'koa-static'
import conditional from 'koa-conditional-get'
import etag from 'koa-etag'
import koaNunjucks from 'koa-nunjucks-2'
import { resolve } from 'path'
import { loggerMount } from './logger'
import defaultConfig from '../../../config/config.default'
// import { reqLoggerMiddlewares } from './logger'
export default app => {
  // config 挂载
  app.config = defaultConfig

  // 数据格式化中间件
  app.use(
    bodyparser({
      enableTypes: ['json', 'form', 'text']
    })
  )

  // 请求日志
  app.use(loggerMount)

  // 数据json
  app.use(json())

  // 静态文件目录
  app.use(koaStatic(resolve(__dirname, '../../..')))

  // 缓存
  app.use(conditional())
  app.use(etag())

  // 模版引擎 nunjucks
  app.use(koaNunjucks({
    ext: 'html',
    path: resolve(__dirname, '../../../views'),
    nunjucksConfig: {
      trimBlocks: true
    }
  }))

  app.keys = ['richlee345642459']

  // session配置
  const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false
  }
  app.use(session(CONFIG, app))
}
