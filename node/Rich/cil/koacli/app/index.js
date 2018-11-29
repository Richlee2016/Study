import Koa from 'koa'
import chalk from 'chalk'
import bug from 'debug'

const debug = bug('static:*')

const MIDDLEWARES = ['general', 'database', 'router']

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8086

class App {
  constructor () {
    this.app = new Koa()
    this.useMiddleware(this.app)(MIDDLEWARES)
    this.errorHandling()
  }

  useMiddleware (app) {
    return m => {
      m.forEach(o => {
        require(`./assets/middlewares/${o}.js`)(app)
      })
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
