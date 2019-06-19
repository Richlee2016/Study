import { controller, get, provide, Context, inject } from "midway";
@provide()
@controller("/index")
export class IndexController {
  @inject("DB")
  serverDb;

  @get("/")
  async index(ctx: Context) {
    ctx.body = 5555;
  }
}
