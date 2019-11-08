const mongoose = require('mongoose')
const { Schema } = mongoose
const MovieSchema = new Schema({
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
})

MovieSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

MovieSchema.statics = {
  async movieSave (movie) {
    const isExist = await this.findOne({ id: movie.id }).exec()
    let _movie
    if (isExist) {
      console.log(`${movie.id}已经存在`)
      return isExist
    } else {
      _movie = new Movie(Object.assign(movie, { _id: movie.id }))
    }
    try {
      await _movie.save()
      console.log(`${movie.id}储存成功`)
      return _movie
    } catch (e) {
      console.log(`${movie.id}储存失败`)
      console.log(e)
    }
  }
}

const Movie = mongoose.model('t_movie_home', MovieSchema)
