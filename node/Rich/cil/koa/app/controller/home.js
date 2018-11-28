
import { Controller, Get } from '../decorator/router'
import { IndexDto } from '../dto/home.dto'
/**
 * 页面渲染
 */
@Controller('')
class Index {
  @Get('', [IndexDto])
  async Index (ctx, next) {
    ctx.body = ctx.query
  }
  @Get('a')
  async Box (ctx, next) {
    ctx.body = 321
  }
}

export default Index
