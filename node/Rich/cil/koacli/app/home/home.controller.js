
import { Controller, Get } from '../assets/decorator'
import MovieServer from '../movie/movie.service'
/**
 * 页面渲染
 */
@Controller('')
class Home {
  /** 预告页 */
  @Get('')
  async Index (ctx, next) {
    ctx.redirect('/home')
  }
  /** 首页 */
  @Get('home')
  async Home (ctx, next) {
    const { HomeNav } = ctx.app.config
    const user = ctx.session.user || {}
    if (Object.keys(user).length) {
      const info = {
        name: user.qqInfo.nickname,
        cover: user.qqInfo.figureurl_qq_2
      }
      ctx.cookies.set('userInfo', encodeURIComponent(JSON.stringify(info)), { httpOnly: false })
    };
    const res = await MovieServer.GetGroup({ types: [1, 2, 3, 4, 21, 31, 41] })
    await ctx.render('home', {
      hot: res[0],
      newest: res[1],
      tv: res[2],
      cartoon: res[3],
      HomeNav,
      rnewest: res[4],
      rtv: res[5],
      rcartoon: res[6]
    })
  }
  /** 详情页 */
  @Get('vod/:id')
  async vod (ctx, next) {
    const { id } = ctx.params
    const res = await MovieServer.GetMovie(id)
    await ctx.render('vod', { data: res })
  }
  /** 列表 */
  @Get('list')
  async list (ctx, next) {
    let querys = ctx.query
    querys.size = 24
    querys.page = querys.page ? Number(querys.page) : 1
    const res = await MovieServer.GetMovies(querys)
    await ctx.render('list', { list: res.list, count: res.count })
  }
  /** 分组 */
  @Get('group/:type')
  async group (ctx, next) {
    let { type } = ctx.params
    let start = 100; let end = 109
    if (type === 'movie') {
      start = 101
      end = 109
    }
    if (type === 'tv') {
      start = 201
      end = 206
    };
    let types = []
    for (let i = start; i < end; i++) {
      types.push(i)
    }
    const res = await MovieServer.GetGroup({ types })
    const list = res.reduce((arr, box) => {
      arr.push(box.Group)
      return arr
    }, [])
    await ctx.render('group', { list })
  }
  /** 搜索 */
  @Get('search')
  async search (ctx, next) {
    const res = await MovieServer.Search(ctx.query)
    await ctx.render('list', { list: res.list, counts: res.counts })
  }
  /** 专题 */
  @Get('topic')
  async topic (ctx, next) {
    let { page, size } = ctx.query
    const res = await MovieServer.GetTopics({ page, size })
    await ctx.render('topic', { data: res.list, count: res.count })
  }
  /** 专题详情 */
  @Get('topicvod/:id')
  async topicvod (ctx, next) {
    let { id } = ctx.params
    id = isNaN(Number(id)) ? 1 : Number(id)
    const res = await MovieServer.GetTopic(id)
    await ctx.render('topicvod', { data: res.list })
  }
  /** 个人中心 */
  @Get('center')
  async center (ctx) {
    await ctx.render('center')
  }

  /** error */
  // 暂无资源页
  @Get('nosorce')
  async NoSorce (ctx, next) {
    await ctx.render('error/nosorce', {})
  }
}

export default Home
