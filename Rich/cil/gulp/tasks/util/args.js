import yargs from 'yargs'

const args = yargs.options('d', {
  alias: 'dir',
  demand: 'false',
  type: 'string',
  default: 'public',
  description: '静态文件目录'
})
  .options('v', {
    alias: 'view',
    demand: 'false',
    type: 'string',
    default: '.',
    description: '页面文件'
  })
  .options('pr', {
    alias: 'production',
    demand: 'false',
    type: 'boolean',
    default: false,
    description: '生产环境'
  })
  .options('h', {
    alias: 'host',
    demand: 'false',
    type: 'string',
    default: 'localhost',
    description: '主机地址'
  })
  .options('p', {
    alias: 'port',
    demand: 'false',
    type: 'number',
    default: 7001,
    description: '端口号'
  }).argv

export default args
