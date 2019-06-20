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

  MovieSchema.methods.fullName = function() {
    return 321;
  };

  return model("t_movie_home", MovieSchema) as MovieModelType;
}
