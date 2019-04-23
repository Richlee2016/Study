const mongoose = require('mongoose')
const { Schema } = mongoose
const OnlineSchema = new Schema({
  _id: Number,
  id: Number,
  name: String,
  area: String,
  othername: String,
  language: String,
  updatetime: String,
  year: String,
  img: String,
  classify: [String],
  actor: [String],
  director: [String],
  intro: String,
  play: [[]],
  relevance: [],
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

OnlineSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

OnlineSchema.statics = {

}

const Online = mongoose.model('t_movie_online', OnlineSchema)
