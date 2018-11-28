import { Controller, Get } from '../decorator/router'
/**
 * 菜单
 */
@Controller('Menu')
class Index {
  @Get('Menus')
  async Index (ctx, next) {
    ctx.body = 323
  }
}

export default Index
