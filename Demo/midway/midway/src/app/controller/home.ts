import { controller, get, provide, Context } from "midway";

@provide()
@controller("/")
export class HomeController {
  @get("/")
  async index(ctx: Context) {
    ctx.body = 321;
  }
}
