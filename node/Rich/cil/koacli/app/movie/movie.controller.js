
import { Controller, Get } from '../assets/decorator'
import MovieService from './movie.service'
import { MovieDtoList } from './dto/movie.dto'
@Controller('Movie')
class Movie {
  /** 电影列表 */
  @Get('GetMovies', [MovieDtoList])
  async GetMovies (ctx, next) {
    const res = await MovieService.GetMovies(ctx.query)
    ctx.session.user = { a: 123 }
    ctx.body = res
    ctx.status = 200
  }
  /** 单个电影 */
  @Get('GetMovie/:id')
  async GetMovie (ctx, next) {
    const { user } = ctx.session
    console.log(user)
    const { id } = ctx.params
    const res = await MovieService.GetMovie(id)
    ctx.body = res
    ctx.status = 200
  }
  /** 获取分组 */
  @Get('GetGroup')
  async GetGroup (ctx, next) {
    let { types, page, size } = ctx.query
    types = types ? types.split(',') : ''
    const res = await MovieService.GetGroup({ types, page, size })
    if (res.length) {
      ctx.body = res
      ctx.status = 200
    } else {
      ctx.body = '没有分组信息'
      ctx.status = 200
    };
  }
}

export default Movie
