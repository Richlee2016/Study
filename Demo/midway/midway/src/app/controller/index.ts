import { controller, get, provide, Context, inject } from "midway";
import { MovieService } from "../lib/service/movie";
@provide()
@controller("/index")
export class IndexController {
  @inject("movieService")
  server: InstanceType<typeof MovieService>;

  @get("/")
  async index(ctx: Context) {
    const res = await this.server.getMovie(3);
    ctx.body = res;
  }
}
