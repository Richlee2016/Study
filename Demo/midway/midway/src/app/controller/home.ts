import { controller, get, provide, Context, inject } from "midway";

@provide()
@controller("/")
export class HomeController {
  @inject("DB")
  serverDb;

  @get("/")
  async index(ctx: Context) {
    ctx.body = 321;
  }
}
