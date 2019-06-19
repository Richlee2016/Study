import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const react = require('../../../dist/ssr/ssr.js');
    console.log(react.render);
    console.log(ctx.service.test.sayHi);
    await ctx.render('index.ejs', {
      box: react.render(),
    });
  }
}
