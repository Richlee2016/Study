import { Schema, model, Document, Model } from "mongoose";
import { providerWrapper } from "midway";
import { IMovie } from "../interface/movie.interface";
/** 包装函数 */
providerWrapper([
  {
    id: "movieModel",
    provider: setUpModel,
    scope: "Singleton"
  }
]);

/** movie model 接口 */
export interface IMovieModel extends IMovie, Document {
  fullName(): string;
}
/** model type */
export type MovieModelType = Model<IMovieModel>;

export default function setUpModel() {
  const MovieSchema: Schema = new Schema({
    _id: Number,
    id: Number,
    name: String,
    score: Number,
    area: String,
    othername: String,
    year: Number,
    img: String,
    cover: String,
    isFinish: String,
    imdb: String,
    catalog: [String],
    classify: [String],
    actor: [String],
    director: [String],
    intro: String,
    url: [[]],
    meta: {
      createAt: {
        type: Date,
        default: Date.now()
      },
      updateAt: {
        type: Date,
        default: Date.now()
      }
    }
  });

  MovieSchema.pre("save", function(this: IMovieModel, next) {
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
      this.meta.updateAt = Date.now();
    }
    next();
  });

  MovieSchema.static({
    movieSave: async movie => {
      const isExist = await this.findOne({ id: movie.id }).exec();
      let _movie;
      if (isExist) {
        console.log(`${movie.id}已经存在`);
        return isExist;
      } else {
        _movie = new Movie(Object.assign(movie, { _id: movie.id }));
      }
      try {
        await _movie.save();
        console.log(`${movie.id}储存成功`);
        return _movie;
      } catch (e) {
        console.log(`${movie.id}储存失败`);
        console.log(e);
      }
    }
  });

  MovieSchema.methods.fullName = function() {
    return 321;
  };
  const Movie = model("t_movie_home", MovieSchema) as MovieModelType;
  return Movie;
}
