import { provide, inject } from "midway";
import { MovieModelType } from "../model/movie";
@provide("movieService")
export class MovieService {
  @inject("movieModel")
  model: MovieModelType;
  /** 获取单个电影 */
  public async getMovie(id: string | number) {
    try {
      const movie = await this.model.findOne({ id }).exec();
      return movie;
    } catch (error) {
      console.log(error);
    }
  }
}
