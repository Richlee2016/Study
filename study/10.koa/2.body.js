const koa = require('koa')
const app = new koa()
const qs = require('querystring')
app.use(async (ctx, next) => {
  if (ctx.url == '/user' && ctx.method == 'GET') {
    ctx.set('Content-Type', 'text/html;charset=utf8')
    ctx.body = `
        <form method="POST">
            <input type="text" name="username"/>
            <input type="submit" />
        </form>
`
  } else if (ctx.method == 'POST') {
    ctx.set('Content-Type', 'application/json')
    ctx.body = await parseBody(ctx)
  } else {
    ctx.body = 'Not Allowed'
  }
})

function parseBody (ctx) {
  return new Promise((resolve, reject) => {
    let buffers = []
    ctx.req.on('data', data => {
      buffers.push(data)
    })
    ctx.req.on('end', data => {
      let body = buffers.toString()
      body = qs.parse(body)
      resolve(body)
    })
    ctx.req.on('error', err => {
      reject(err)
    })
  })
}

app.listen(8080, () => {
  console.log('your server is start on 8080')
})
