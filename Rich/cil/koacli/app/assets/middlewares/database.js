import mongoose from 'mongoose'
import { resolve } from 'path'
import glob from 'glob'
import bug from 'debug'
import chalk from 'chalk'
const debug = bug('static:*')

// 读取schema 文件
// const appPath = resolve(__dirname, '../schemas/')

// 加载 schemas
glob.sync(resolve(__dirname, '../schemas/*.js')).forEach(schema => require(schema))

export default app => {
  // mongoose.set('debug', true)
  mongoose.Promise = global.Promise
  mongoose.connect(app.config.db, {
    useNewUrlParser: true
  })
  mongoose.connection.on('disconnected', () => {
    mongoose.connect(app.config.db)
  })

  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.once('open', async () => {
    debug(chalk.green(`Connected to MongoDB ${app.config.db}`))
  })
}
