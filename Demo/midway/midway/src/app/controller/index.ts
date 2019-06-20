import { controller, get, provide, Context, inject } from "midway";
import { MovieService } from "../lib/interface/movie.interface";
@provide()
@controller("/index")
export class IndexController {
  @inject("DB")
  serverDb;

  @inject("movieService")
  service: MovieService;

  @get("/")
  async index(ctx: Context) {
    const res = await this.service.go();
    ctx.body = res;
  }
}
