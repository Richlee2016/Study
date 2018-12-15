
import { Controller, Get } from '../assets/decorator'
/**
 * 页面渲染
 */
@Controller('')
class Home {
  @Get('')
  async Index (ctx, next) {
    ctx.redirect('/home')
  }
  @Get('home')
  async Home (ctx, next) {
    await ctx.render('/home.html')
  }
  /** error */
  // 暂无资源页
  @Get('nosorce')
  async NoSorce (ctx, next) {
    await ctx.render('error/nosorce.html', {})
  }
}

export default Home
