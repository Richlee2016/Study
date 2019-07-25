import { provide, inject, Context } from "midway";
import { MovieModelType } from "../model/movie";

@provide("movieService")
export class MovieService {
  /**
   *注入参数
   *@ctx
   *@modle
   */
  @inject()
  ctx: Context;
  @inject("movieModel")
  model: MovieModelType;

  /**
   * 电影家园电影爬取
   */
  public async movieHome() {}
}
