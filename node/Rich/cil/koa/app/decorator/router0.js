import Router from 'koa-router'
import glob from 'glob'
import { resolve } from 'path'
import _ from 'lodash'

export let routersMap = new Map()
export const symbolPrefix = Symbol('prefix')
export const isArray = c => (_.isArray(c) ? c : [c])

export class Route {
  constructor (app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }

  init () {
    glob.sync(resolve(this.apiPath, './*.js')).forEach(require)
    for (let [conf, controller] of routersMap) {
      const { target, path, method } = conf
      const url = target[symbolPrefix] + path
      const controllers = isArray(controller)
      this.router[method](url, ...controllers)
      // console.log(method,url);
    }
    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}

export const controller = path => target => {
  target.prototype[symbolPrefix] = path
}

export const route = opt => (target, key, descriptor) => {
  routersMap.set(
    {
      target,
      ...opt
    },
    target[key]
  )
}

export const get = path =>
  route({
    method: 'get',
    path
  })

export const post = path =>
  route({
    method: 'post',
    path
  })

export const del = path =>
  route({
    method: 'delete',
    path
  })

export const put = path =>
  route({
    method: 'put',
    path
  })

export const all = path =>
  route({
    method: 'all',
    path
  })

export const sayError = (code, message, mixin) => {
  if (message) console.log(message)
  return Object.assign({}, { code, message }, mixin)
}

export const state = (code, message, mixin) => {
  let msg = message
  switch (code) {
    case 200: // [GET]服务器成功返回用户请求的数据
      msg = 'OK'
      break
    case 201: // [POST/PUT/PATCH]：用户新建或修改数据成功。
      msg = 'CREATED'
      break
    case 204: // [DELETE]：用户删除数据成功。
      msg = 'NO CONTENT'
      break
    case 400: // [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作
      msg = 'INVALID REQUEST'
      break
    case 401: // [*]：表示用户没有权限（令牌、用户名、密码错误）
      msg = 'Unauthorized'
      break
    case 403: // [*]：表示用户没有权限（令牌、用户名、密码错误）
      msg = 'Forbidden'
      break
  }
}
