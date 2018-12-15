import redis from 'redis'
import bug from 'debug'
import chalk from 'chalk'
import config from '../../../config/config.default'
const debug = bug('static:*')
export const client = redis.createClient(config.redis.port, config.redis.host)

export default app => {
  app.use((ctx, next) => {
    ctx.redisClient = client
    return next()
  })

  client.on('connect', function (data) {
    debug(chalk.green(`redis is start at ${config.redis.host + ':' + config.redis.port}`))
  })

  client.on('error', function (err) {
    debug(chalk.red('redis connect err' + err))
  })
}
