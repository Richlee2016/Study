import { provide, inject } from "midway";
import { MovieModelType } from "../model/movie";
import { SearchMovie } from "../interface/movie.interface";
@provide("movieService")
export class MovieService {
  @inject("movieModel")
  model: MovieModelType;
  /** 获取单个电影 */
  public async getMovie(id: number) {
    try {
      const movie = await this.model.findOne({ id }).exec();
      return movie;
    } catch (error) {
      console.log(error);
    }
  }
  /** 获取多个电影 */
  public async getMovies(q: SearchMovie) {
    const { page = 1, size = 10 } = q;
    const query: any[] = [{ id: { $exists: true } }];
    for (const [key, val] of Object.entries(q)) {
      const data = {};
      if (!["page", "size"].includes(key)) {
        data[key] = val;
        query.push(data);
      }
    }
    const skip = (page - 1) * size;
    const search = {
      name: { $ne: "none" },
      $and: query
    };
    try {
      const counts = await this.model.countDocuments(search).exec();
      const movielist = await this.model
        .find(search, {
          name: 1,
          year: 1,
          img: 1,
          cover: 1
        })
        .sort({ _id: -1 })
        .limit(size)
        .skip(skip)
        .exec();

      return {
        list: movielist,
        count: counts
      };
    } catch (error) {
      console.log(error);
    }
  }
  /**搜索电影 */
  public async searchMovie(q: {
    keyword: string;
    page?: number;
    size?: number;
  }) {
    const { keyword, page = 1, size = 10 } = q;
    const reg = new RegExp(keyword);
    const query: any = {
      $or: [{ name: { $regex: reg } }]
    };
    if (keyword.length >= 2) {
      query["$or"].concat([
        { actor: { $regex: reg } },
        { director: { $regex: reg } }
      ]);
    }
    const skip = (page - 1) * size;
    try {
      const counts = await this.model.countDocuments(query).exec();
      const list = await this.model
        .find(query)
        .sort({ _id: -1 })
        .limit(size)
        .skip(skip)
        .exec();
      return { counts, list };
    } catch (error) {
      console.log(error);
    }
  }
}
