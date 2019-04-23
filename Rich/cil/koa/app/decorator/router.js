import Router from 'koa-router'
import glob from 'glob'
import { resolve } from 'path'
import _ from 'lodash'
import bug from 'debug'
import chalk from 'chalk'
const debug = bug('路由路径错误:*')
const miDeBug = bug('中间格式错误:*')
let routerMap = new Map()
const symbolController = Symbol('controller')
const symbolMiddleware = Symbol('middleware')

export class MyRoute {
  constructor (app, pathes) {
    this.app = app
    this.pathes = pathes
    this.router = new Router()
  }

  /** 获取路径 */
  _getPath (c, p) {
    const isPath = path => /^\//.test(path)
    if (isPath(c)) {
      debug(chalk.red(`控制器 ${c},首字母不能是 / `))
    }
    if (isPath(p)) {
      debug(chalk.red(`路由 ${p},首字母不能是 /`))
    }
    if (!isPath(p) && !isPath(c)) {
      let cPath = c ? '/' + c : ''
      let pPath = p ? '/' + p : ''
      return cPath + pPath
    } else {
      return '/'
    }
  }

  /** 验证中间件是否为数组 */
  _notMiddlewares (m) {
    if (!_.isArray(m)) {
      miDeBug(chalk.red('中间件必须为数组'))
    }
  }

  init () {
    glob.sync(resolve(this.pathes, './*.js')).forEach(require)
    for (const [opt, controller] of routerMap) {
      const { method, path, target, middlewares } = opt

      let cPath = target[symbolController]

      let cMiddlewares = target[symbolMiddleware] || []
      this._notMiddlewares(middlewares || [])
      this._notMiddlewares(cMiddlewares || [])
      const controllers = (cMiddlewares || []).concat((middlewares || []), [controller])

      this.router[method](this._getPath(cPath, path), ...controllers)
    }
    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}

export const Controller = (path, middlewares) => (target) => {
  target.prototype[symbolController] = path
  target.prototype[symbolMiddleware] = middlewares
}

/**
 * 路由请求
 * get
 * post
 */
const setRouter = opt => (target, name, descriptor) => routerMap.set({ target, ...opt }, target[name])

export const Get = (path, middlewares) => setRouter({ method: 'get', path, middlewares })
export const Post = (path, middlewares) => setRouter({ method: 'post', path, middlewares })
