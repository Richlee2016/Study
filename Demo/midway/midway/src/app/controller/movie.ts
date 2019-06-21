import { controller, get, provide, Context, inject } from "midway";
import { MovieService } from "../lib/service/movie";
@provide()
@controller("/movie")
export class MovieController {
  @inject("movieService")
  server: InstanceType<typeof MovieService>;

  @get("/getMovie")
  async getMovie(ctx: Context) {
    const { id } = ctx.query;
    console.log(id);
    const res = await this.server.getMovie(id);
    ctx.body = res;
  }

  @get("/getMovies")
  async getMovies(ctx: Context) {
    const query = ctx.query;
    const res = await this.server.getMovies(query);
    ctx.body = res;
  }

  @get("/searchMovie")
  async searchMovie(ctx: Context) {
    const query = ctx.query;
    const res = await this.server.searchMovie(query);
    ctx.body = res;
  }
}
