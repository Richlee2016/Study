const koa = require('koa');
const app = new koa();

app.use(async ctx => {
    console.log(ctx.method);
    console.log(ctx.url);
    console.log(ctx.headers);
    console.log(ctx.querystring);
    console.log(query);
    ctx.body = ctx.headers;
})

app.listen(8080)

