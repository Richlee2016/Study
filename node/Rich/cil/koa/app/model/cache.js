const mongoose = require('mongoose')
const { Schema } = mongoose
const Mixed = Schema.Types.Mixed
const MovieSchema = new Schema({
  key: String,
  name: String,
  describe: String,
  data: Mixed,
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
  async setCache (_cache) {
    let cache = await this.findOne({ name: _cache.key }).exec()
    if (cache) {
      cache = Object.assign(cache, _cache)
    } else {
      cache = new Movie(_cache)
    };

    try {
      const res = await cache.save()
      return res
    } catch (error) {
      console.log(error)
    }
  }
}

const Movie = mongoose.model('t_cache', MovieSchema)
