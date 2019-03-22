const url = require('url')
const Layer = class {
  constructor (method, path, route) {
    this.path = path
    this.method = method
    this.route = route
  }

  match (curPath) {
    let flag = false
    if (curPath === this.path) {
      flag = true
    }
    return flag
  }
}

module.exports = class KoaRouter {
  constructor () {
    this.routeStack = []
  }

  getMatchRoutes (curPath) {
    return this.routeStack
      .filter(item => {
        return item.match(curPath)
      })
      .map(o => o.route)
  }

  compose (routes, ctx) {
    return dispatch(0)
    function dispatch (i) {
      let route = routes[i]
      if (!route) {
        return Promise.resolve()
      }
      return routes[i](ctx, function next () {
        return dispatch(i + 1)
      })
    }
  }

  routes () {
    return async (ctx, next) => {
      let routes = this.getMatchRoutes(ctx.path.pathname)
      if (!routes) {
        return next()
      }
      const fnMiddleware = this.compose(
        routes,
        ctx
      )
      fnMiddleware
        .then(() => {
          return next()
        })
        .catch(err => {
          console.log(111, err)
        })
      // 1.判断规则
      // 2.管理路由
    }
  }

  all (path, route) {
    let layer = new Layer('all', path, route)
    this.routeStack.push(layer)
  }
}
