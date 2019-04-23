const Koa = require('./koa')

const app = new Koa()
app.use(async (ctx, next) => {
  ctx.body = 'good'
  return next()
})
app.use(async (ctx, next) => {
  const { body } = ctx
  ctx.body = body + 'the second middlware'
  return next()
})
app.listen(8064)
