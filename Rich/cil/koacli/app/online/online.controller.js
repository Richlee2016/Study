import { Controller, Get, Post } from '../assets/decorator'
import OnlineService from './online.service'
import CrawlerService from '../crawler/crawker.service'
@Controller('Online')
class Online {
    @Get('Search')
  async Search (ctx, next) {
    const { wd } = ctx.query
    const res = await CrawlerService.ProxyOnlineSearch(wd)
    ctx.body = res
  }
}

export default Online
