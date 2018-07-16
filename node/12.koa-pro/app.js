const Koa = require('./src/tiny-koa');
const koaStatic = require('./src/middleware/koa-static');
const KoaRouter = require('./src/middleware/koa-router');
const path = require('path');
const app = new Koa();
const router = new KoaRouter();

const port = 8097;
app.use(koaStatic(path.join(__dirname,'src','static')));

router.all('/api/post',async (ctx,next) => {
    ctx.body = 'gogo';
    return next();
})

router.all('/api/two',async (ctx,next) => {
    ctx.body = 'gogo2';
    return next();
})
app.use(router.routes());

// app.use(async (ctx,next) => {
    // ctx.res.setHeader('m2',"m2")
    // ctx.body = 'mid 1'
    // await next();
    // console.log(2);
// })
// app.use(async (ctx,next) => {
//     ctx.body = 'mid 2'
//     next();
//     console.log(4);
// })
// app.use(async (ctx,next) => {
//     ctx.body = 'mid 3'
//     next();
//     console.log(6);
// })
app.listen(port,() => {
    console.log(`${port} is open`);
})