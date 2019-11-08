const http = require('http')
const url = require('url')
const Stream = require('stream')
module.exports = class Koa {
  constructor () {
    this.middleware = []
  }

  use (fn) {
    this.middleware.push(fn)
  }

  compoes (middleware, ctx) {
    // 手动过程
    // return function fnMiddleware(){
    //     let i = 0;
    //     return middleware[i](ctx,function(){
    //         return middleware[i+1](ctx,function(){
    //             return middleware[i+2](ctx,function(){
    //                 return Promise.resolve()
    //             })
    //         })
    //     })
    // }
    return dispatch(0)
    function dispatch (i) {
      let fn = middleware[i]
      if (!fn) { return Promise.resolve() };
      return fn(ctx, function next () {
        return dispatch(i + 1) // 必须返回 下一个中间件  不然异步可能会出问题
      })
    }
  }

  handleResponse (ctx) {
    const { body, req, res } = ctx
    if (typeof body === 'string') {
      ctx.res.end(body)
    } else if (body instanceof Stream) {
      body.pipe(res)
    };
  }

  listen (port, cb) {
    let server = http.createServer((req, res) => {
      let ctx = {}
      ctx.req = req
      ctx.res = res
      ctx.path = url.parse(req.url)
      let fnMiddleware = this.compoes(this.middleware, ctx)
      fnMiddleware.then(() => {
        this.handleResponse(ctx)
        // res.end(this.ctx.body);
      }).catch(() => {

      })
    })
    server.listen(port, cb)
  }
}
