const Koa = require('koa')
const koaStatic = require('koa-static')
const { resolve } = require('path')
const app = new Koa()

app.use(koaStatic(resolve(__dirname, './static')))

app.listen(8066)
