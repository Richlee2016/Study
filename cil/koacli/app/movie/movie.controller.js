
import { Controller, Get, Post } from '../assets/decorator'
import MovieService from './movie.service'
import CrawlerService from '../crawler/crawker.service'
import QiNiuService from '../qiniu/qiniu.service'
import { MovieDtoList, MovieDtoGroup } from './dto/movie.dto'

@Controller('Movie')
class Movie {
  /** 电影列表 */
  @Get('GetMovies', [MovieDtoList])
  async GetMovies (ctx, next) {
    const res = await MovieService.GetMovies(ctx.query)
    ctx.body = res
  }
  /** 单个电影 */
  @Get('GetMovie/:id')
  async GetMovie (ctx, next) {
    const { id } = ctx.params
    const res = await MovieService.GetMovie(id)
    ctx.body = res
  }
  /** 获取分组 */
  @Get('GetGroup')
  async GetGroup (ctx, next) {
    let { types, page, size } = ctx.query
    types = types ? types.split(',') : ''
    const res = await MovieService.GetGroup({ types, page, size })
    ctx.body = res
  }
  /** 创建分组 */
  @Post('CreateGroup', [MovieDtoGroup])
  async CreateGroup (ctx, next) {
    const group = ctx.request.body
    const res = await MovieService.CreateGroup(group)
    ctx.body = res
    ctx.status = 201
  }
  /** 编辑分组 */
  @Post('UpdateGroup', [MovieDtoGroup])
  async UpdateGroup (ctx, next) {
    const group = ctx.request.body
    ctx.validate(this.GroupValidate)
    await MovieService.UpdateGroup(group)
    ctx.body = '修改成功'
    ctx.status = 201
  }
  /** 获取专题 */
  @Get('GetTopics')
  async GetTopics (ctx, next) {
    const res = await MovieService.GetTopics(ctx.query)
    ctx.body = res
    ctx.status = 200
  }
  /** 获取单个专题 */
  @Get('GetTopic/:id')
  async GetTopic (ctx, next) {
    const { id } = ctx.params
    const res = await MovieService.GetTopic(id)
    ctx.body = res
    ctx.status = 200
  }

  /** 抓取电影 */
  @Get('CrawlerMovie')
  async CrawlerMovie (ctx, next) {
    await CrawlerService.updateMovieHome()
    ctx.body = 123
  }

  @Get('cralwerOnline')
  async cralwerOnline (ctx) {
    const res = await CrawlerService.uploadOnline()
    ctx.body = res
  }

  @Get('qiniuhome')
  async qiniuhome (ctx) {
    await QiNiuService.HomeCoverUpdate()
    ctx.body = 1
  }
  @Get('qiniulist')
  async qiniulist (ctx) {
    console.log(321)
    const del = await QiNiuService.FindPrefix()
    ctx.body = del
  }
}

export default Movie
