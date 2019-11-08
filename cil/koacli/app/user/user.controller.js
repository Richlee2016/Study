import { Controller, Get, Post } from '../assets/decorator'
import UserService from './user.service'
@Controller('oauth')
class User {
    @Get('qq')
  async qq (ctx, next) {
    const { code, state } = ctx.query
    const user = await UserService.oauthHandle(code, state)
    ctx.session.user = user
    ctx.redirect('/home')
  }
}

export default User
