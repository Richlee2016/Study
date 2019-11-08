import bodyparser from 'koa-bodyparser'
import session from 'koa-session'
import json from 'koa-json'
import koaStatic from 'koa-static'
import koaViews from 'koa-views'
import { resolve } from 'path'
import defaultConfig from '../../config/config.default'

module.exports = app => {
  // config 挂载
  app.config = defaultConfig

  // 数据格式化中间件
  app.use(
    bodyparser({
      enableTypes: ['json', 'form', 'text']
    })
  )

  // 数据json
  app.use(json())

  // 静态文件目录
  app.use(koaStatic(resolve(__dirname, '../public')))

  // 模版引擎 nunjucks
  app.use(
    koaViews(
      resolve(__dirname, '../views'),
      {
        map: { html: 'nunjucks' }
      }
    )
  )

  // 请求时间
  app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })

  // session配置
  const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    signed: true,
    rolling: false
  }
  app.use(session(CONFIG, app))
}
