export default {
  db: 'mongodb://localhost:27017/eggapi',
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  qiniu: {
    cname: 'http://go.richfly.cn/',
    bucket: 'eggapi',
    AK: 'OBDA2gN9-FJfAzWExCHGNNG9QW5FqNtUrD57IwIi',
    SK: 'lkrOjtgXY4WmN7NcJNSKNXb7aLue13_CPg_0X0NH'
  },
  // home 页面设置
  HomeNav: {
    newest: ['更新', '动作片', '喜剧片', '科幻片', '恐怖片', '剧情片'],
    tv: ['最新', '国产剧', '港台剧', '欧美剧', '日韩剧'],
    catoon: ['最新', '热门']
  },
  // qq auth
  QQauth: {
    prefix: 'https://graph.qq.com',
    appID: 101435375,
    appKey: '91c323460e027125cdeef61365ca86f3'
  }
}
