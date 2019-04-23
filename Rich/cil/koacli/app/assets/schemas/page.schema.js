const mongoose = require('mongoose')
const { Schema } = mongoose
const Mixed = Schema.Types.Mixed
const MoviePageSchema = new Schema({
  name: String,
  /**
     * topic 2000
     */
  type: Number,
  describe: String,
  list: Mixed,
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

MoviePageSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

MoviePageSchema.statics = {

}

const Page = mongoose.model('t_movie_page', MoviePageSchema)
