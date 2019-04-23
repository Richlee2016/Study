const Koa = require("./koa");
const path = require('path');
const KoaStatic = require("./koa-static")
const app = new Koa();

app.use(KoaStatic(path.resolve(__dirname,".","public")));

// app.use((ctx, next) => {
//   ctx.body = 1;
//   console.log(1);
//   return next();
//   console.log(2);
// });

// app.use((ctx, next) => {
//   console.log(3);
//   ctx.body = { a: 1, b: 2 };
//   return next();
//   console.log(4);
// });

app.listen(3006, () => {
  console.log(`start at 3600`);
});
