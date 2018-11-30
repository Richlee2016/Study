import { Injectable } from '../assets/decorator'

@Injectable()
class Home {
  constructor () {
    this.name = 1
  }
  async sayName (name) {
    this.ctx.sayInfo('这是我的名字').info(name)
    this.ctx.redisClient.set('i am', 'good')
    return name
  }
}

export default new Home()
