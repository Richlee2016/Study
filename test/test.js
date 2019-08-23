/*
 * @Date: 2019-08-22 16:29:58
 * @LastEditors: RichLee
 * @LastEditTime: 2019-08-22 16:38:59
 */
const Koa = require("koa");
const app = new Koa();
const _delay = time => new Promise(resolve => setTimeout(resolve, time));
const mid1 = async (ctx, next) => {
  setTimeout(() => {
    console.log("start 111");
  }, 1000);
  await _delay(1000);
  await next();
  console.log("end 111");
};
const mid2 = async (ctx, next) => {
  console.log("start 222");
  await next();
  console.log("end 222");
};
app.use(mid1);
app.use(mid2);
app.use(async function(ctx) {
  console.log("333");
  ctx.body = "321";
});

app.listen("8036");
