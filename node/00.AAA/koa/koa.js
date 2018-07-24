const http = require("http");
const Stream = require("stream");
module.exports = class Koa {
  constructor() {
    this.middleware = [];
  }

  use(fn) {
    this.middleware.push(fn);
  }

  compoes(ctx, middleware) {
    return dispatch(0);
    function dispatch(i) {
      let fn = middleware[i];
      if (!fn) {
        return Promise.resolve();
      }
      return fn(ctx, function next() {
        return dispatch(i + 1);
      });
    }
  }

  handleRespons(ctx) {
    const { body, req, res } = ctx;
    if (typeof body == "string") {
      res.end(body);
    }else if(typeof body == 'object'){
      if (body instanceof Stream) {
        body.pipe(res);
      }
      res.end(JSON.stringify(body));
    }
  }

  listen(port, cb) {
    const server = http.createServer((req, res) => {
      let ctx = {};
      ctx.req = req;
      ctx.res = res;
      const fnMiddleware = this.compoes(ctx, this.middleware);
      fnMiddleware
        .then(() => {
          this.handleRespons(ctx);
        })
        .catch(err => {});
    });
    server.listen(port, cb);
  }
};
