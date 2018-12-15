
import log4js from 'log4js'

log4js.configure({
  appenders: {
    stdout: {
      type: 'stdout'
    },
    req: {
      type: 'dateFile',
      filename: './logs/reqlog/',
      pattern: 'yyyy-MM-dd.log',
      maxLogSize: 50 * 1024 * 1024,
      alwaysIncludePattern: true
    },
    info: {
      type: 'dateFile',
      filename: './logs/infolog/',
      pattern: 'yyyy-MM-dd.log',
      maxLogSize: 50 * 1024 * 1024,
      alwaysIncludePattern: true
    },
    error: {
      type: 'dateFile',
      filename: './logs/errorlog/',
      pattern: 'yyyy-MM-dd.log',
      maxLogSize: 50 * 1024 * 1024,
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: { appenders: ['stdout', 'info'], level: 'info' },
    error: { appenders: ['stdout', 'error'], level: 'error' },
    req: { appenders: ['stdout', 'req'], level: 'debug' }
  }
})

export const logger = name => log4js.getLogger(name || 'default')

// 挂载 controller logger
export const loggerMount = (ctx, next) => {
  ctx.sayInfo = logger
  ctx.sayError = err => logger('error').error(err)
  return next()
}

// 记录请求日志
export const reqLoggerMiddleware = async (ctx, next) => {
  const { method, url } = ctx
  const start = new Date()
  await next()
  const ms = new Date() - start
  const isCss = /\/(css).+/.test(url)
  const isJs = /\/(js).+/.test(url)
  if (isCss || isJs) return
  let reqData = {}
  switch (method) {
    case 'GET':
      reqData = ctx.query
      break
    case 'POST':
      reqData = ctx.request.body
      break
  }
  let resData = {}
  if (ctx.type === ('application/json' || 'text/plain')) {
    resData = ctx.body
  }
  logger('req').debug({
    method,
    url,
    ms,
    data: reqData,
    res: resData
  })
}
