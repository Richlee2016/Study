import Koa from 'koa'
import chalk from 'chalk'
import bug from 'debug'
import { MyProcess } from './assets/worker/index'
const debug = bug('static:*')
/*, 'redis' */
const MIDDLEWARES = ['general', 'database', 'router']
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8043

class App {
  constructor () {
    this.app = new Koa()
    this.useMiddleware(this.app)(MIDDLEWARES)
    this.errorHandling()
  }

  useMiddleware (app) {
    return async m => {
      console.log(1)
      const midMap = m.map(o => {
        return import(`./assets/middlewares/${o}.js`)
      })
      const mids = await Promise.all(midMap)
      mids.forEach(mid => mid.default(app))
    }
  }

  errorHandling () {
    this.app.on('error', (err, ctx) => {
      debug(`server error ${chalk.red(err)}`)
    })
  }

  start () {
    this.app.listen(port, host)
    const link = `http://${host}:${port}`
    debug(`server is start on ${chalk.green(link)}`)
  }
}

const app = new App()

app.start()
