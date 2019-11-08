const mongoose = require('mongoose')
const { Schema } = mongoose
const UserSchema = new Schema({
  openid: String,
  qqInfo: Object,
  limit: {
    // 权限系统  1~100  100最高权限(在下 Rich Lee 有何贵干！ (￣_,￣ ) )
    type: Number,
    default: 1
  },
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

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

UserSchema.statics = {
  async saveUser (openid, qqInfo) {
    let user = await this.findOne({ openid }).exec()
    const now = Date.now()
    const oneMonth = 1000 * 60 * 60 * 24 * 30
    let _user = {
      openid,
      qqInfo
    }
    if (user) {
      if (now - user.meta.updateAt.getTime() > oneMonth) {
        user.qqInfo = qqInfo
      };
    } else {
      user = new User(_user)
    }

    try {
      console.log(user)
      const res = await user.save()
      return res
    } catch (error) {
      console.log(error)
    }
  }
}

const User = mongoose.model('t_oauth_users', UserSchema)
