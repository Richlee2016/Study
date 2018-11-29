
import { Controller, Get } from '../assets/decorator'
import { IndexDto } from './dto/home.dto'
import HomeService from './home.service'
/**
 * 页面渲染
 */
@Controller('')
class Home {
  @Get('', [IndexDto])
  async Index (ctx, next) {
    const res = await HomeService.sayName('rich')
    ctx.body = res
  }
  @Get('a')
  async Box (ctx, next) {
    ctx.body = 321
  }
}

export default Home
