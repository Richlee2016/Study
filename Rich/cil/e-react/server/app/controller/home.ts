import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const react = require('../../../dist/ssr/ssr.js');
    console.log(react.render);
    await ctx.render('index.ejs', {
      box: react.render(),
    });
  }
}
