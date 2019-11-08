import mongoose from 'mongoose'
import { resolve } from 'path'
import glob from 'glob'
import bug from 'debug'
import chalk from 'chalk'

const debug = bug('static:*')
// 读取schema 文件
const models = resolve(__dirname, '../model')

glob.sync(resolve(models, './*.js')).forEach(require)

module.exports = app => {
  mongoose.set('debug', true)
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
