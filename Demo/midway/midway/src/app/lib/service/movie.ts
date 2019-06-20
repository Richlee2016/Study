import { provide, inject } from "midway";
import { MovieModelType } from "../model/movie";
@provide("movieService")
export class MovieService {
  @inject("movieModel")
  model: MovieModelType;

  async go() {
    const res = await this.model.find({ id: 3 }).exec();
    return res;
  }
}
