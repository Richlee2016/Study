import { Route } from '../decorator/router0'
import { MyRoute } from '../decorator/router'
import { resolve } from 'path'

const r = path => resolve(__dirname, path)

module.exports = app => {
  const apiPath = r('../controller')
  // const routes = new Route(app, apiPath)
  // routes.init()
  const myroutes = new MyRoute(app, apiPath)
  myroutes.init()
}
