import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    console.log(ctx.csrf);
    await ctx.render('index.pug');
  }

  public async home() {
    const { ctx } = this;
    await ctx.render('home.pug', { boxs: ['富强', 2, '明主', 4] });
  }

  public async postTest() {
    const { ctx } = this;
    const { box } = ctx.request.body;
    ctx.body = `这是前台获取到的${box}`;
  }
}
