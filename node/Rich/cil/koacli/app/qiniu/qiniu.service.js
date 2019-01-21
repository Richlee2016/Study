import mongoose from 'mongoose'
import { Injectable } from '../assets/decorator'
import qiniu from 'qiniu'
@Injectable()
class QiNiu {
  constructor () {
    this.Movie = mongoose.model('t_movie_home')
    const config = this.ctx.config
    const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
    const cfg = new qiniu.conf.Config()
    this.bucket = config.qiniu.bucket
    this.client = new qiniu.rs.BucketManager(mac, cfg)
    this.nextMarker = ''
  }

  _sleep (time) {
    return new Promise(resolve => {
      setTimeout(resolve, time)
    })
  }

  /** 上传封装 */
  _uploadToQiniu (url, key) {
    return new Promise((resolve, reject) => {
      console.log(url, key)
      this.client.fetch(url, this.bucket, key, (err, ret, info) => {
        if (err) {
          reject(err)
        } else {
          if (info.statusCode === 200) {
            resolve({
              key
            })
          } else {
            reject(info)
          }
        }
      })
    })
  }
  /** 查询列表封装 */
  _listPrefix (options) {
    const self = this
    return new Promise((resolve, reject) => {
      this.client.listPrefix(this.bucket, options, function (err, respBody, respInfo) {
        if (err) reject(err)
        if (!respInfo) reject(err)
        if (respInfo.statusCode === 200) {
          self.nextMarker = respBody.marker
          resolve(respBody.items)
        }
      })
    })
  }
  /** 批量删除封装 */
  _deleteList (list) {
    const opt = list.map(o => qiniu.rs.deleteOp(this.bucket, o.key))
    return new Promise((resolve, reject) => {
      this.client.batch(opt, function (err, respBody, respInfo) {
        if (err) {
          reject(err)
        } else {
          if (parseInt(respInfo.statusCode / 100) === 2) {
            const len = respBody.filter(o => o.code === 200)
            console.log(`删除${len.length}个`)
            resolve(respBody)
          } else {
            console.log(respInfo.deleteusCode)
            console.log(respBody)
          }
        }
      })
    })
  }
  /** 删除 cover */
  async DeleteDbCover () {
    // db.yourcollection.update({},{$unset:{"需要删除的字段":""}},false,true)
    await this.Movie.updateMany({ $where: "this.cover && 'movie_home_'+ this.id + '.jpg' !== this.cover" }, {
      $set: { cover: '' }
    }).exec()
  }

  /** 上传 电影家园 电影封面 */
  async HomeCoverUpdate () {
    const query = { $and: [{ cover: { $exists: false }, img: { $nin: ['', null] }, name: { $nin: ['none'] } }] }
    try {
      let _movie = await this.Movie.findOne(query).exec()

      if (!_movie) {
        console.log('完成上传')
        return
      };
      const img = await this._uploadToQiniu(_movie.img, `movie_home_${_movie.id}.jpg`)
      _movie.cover = img.key
      await _movie.save()
      const ran = 2000 + Math.random() * 1000
      console.log('ran-time===>', ran)
      await this._sleep(ran)
      await this.HomeCoverUpdate()
    } catch (err) {
      console.log(`页面出现${err.status}错误}}`)
      if ([404, 478].indexOf(err.status) !== -1) {
        await this.Movie.updateOne(query, { $set: { img: '' } })
        await this._sleep(Math.random() * 1000)
        await this.HomeCoverUpdate()
      } else if (err.status === -2) {
        await this._sleep(2000 + Math.random() * 1000)
        await this.HomeCoverUpdate()
      } else {
        console.log(err)
      };
    }
  }

  /** 查询前缀列表列表 */
  async FindPrefix () {
    try {
      const res = await this._listPrefix({ limit: 500, prefix: 'online', marker: '' })
      console.log('查询个数===>', res.length)
      if (res.length < 50) {
        console.log('over')
        return 1
      } else {
        await this._deleteList(res)
        await this._sleep(3000)
        await this.FindPrefix()
      }
    } catch (error) {
      console.log(error)
    }
    return 2
  }
}

export default new QiNiu()
