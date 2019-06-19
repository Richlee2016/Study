import { Schema, model } from "mongoose";

const movieSchema = new Schema({
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

model("t_movie_home", movieSchema);
