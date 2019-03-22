const http = require('http')
const url = require('url')
const Stream = require('stream')
class Koa {
  constructor () {
    this.middlewares = []
  }
  use (middleware) {
    this.middlewares.push(middleware)
  }

  compoes (middleware, ctx) {
    // [router,one,two,three]
    // mid[0],next=> one(ctx,two(ctx,three))
    // 无需考虑太多 就是一种数据结构  对应的函数写法
    // 这个就是 洋葱模型
    // return function fnMiddleware () {
    //   let i = 0
    //   return mid[i](ctx, function () {
    //     return mid[i + 1](ctx, function () {
    //       return mid[i + 2](ctx, function () {
    //         return Promise.resolve()
    //       })
    //     })
    //   })
    // }
    return dispatch(0)
    function dispatch (idx) {
      let fn = middleware[idx]
      if (!fn) return Promise.resolve()
      return fn(ctx, function next () {
        dispatch(idx + 1)
      })
    }
  }

  handleRequest (ctx) {
    const { body, res } = ctx
    if (typeof body === 'string') {
      res.end(body)
    } else if (body instanceof Stream) {
      res.pipe(body)
    }
  }

  listen (port) {
    const server = http.createServer((req, res) => {
      let ctx = {}
      ctx.res = res
      ctx.req = req
      ctx.path = url.parse(req.url)
      const fnMiddlware = this.compoes(this.middlewares, ctx)
      fnMiddlware.then(() => {
        this.handleRequest(ctx)
      }).catch(err => {
        console.log(err)
      })
    })
    server.listen(port, () => {
      console.log(21)
    })
  }
}

module.exports = Koa
