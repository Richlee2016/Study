import mongoose from 'mongoose'
import { Injectable } from '../assets/decorator'
@Injectable()
class Home {
  constructor () {
    this.Movie = mongoose.model('t_movie_home')
    this.Group = mongoose.model('t_movie_group')
  }
  /*
   * 根据url参数 筛选电影
   * @param {Object} q:{page,size,year,director,actor,classify,catalog} 筛选参数
   * @return {Object} 筛选结果
   */
  async GetMovies (q) {
    let { page, size } = q
    page = isNaN(Number(page)) ? 1 : Number(page)
    size = isNaN(Number(size)) ? 10 : Number(size)
    let query = [{ id: { $exists: true } }]
    for (let [key, val] of Object.entries(q)) {
      let data = {}
      if (['page', 'size'].indexOf(key) === -1) {
        data[key] = val
        query.push(data)
      }
    }
    let skip = (page - 1) * size
    let search = {
      name: { $ne: 'none' },
      $and: query
    }
    try {
      const counts = await this.Movie.countDocuments(search).exec()
      const movielist = await this.Movie.find(search, { name: 1, year: 1, img: 1, cover: 1 }).sort({ _id: -1 }).limit(size).skip(skip).exec()

      return {
        list: movielist,
        count: counts
      }
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * 根据id 查找单个电影
   * @param {number} id
   * @return {Object} 单个电影结果
   */
  async GetMovie (id) {
    const ctx = this.ctx
    try {
      let movie = await this.Movie.findOne({ id }).exec()
      if (!movie) ctx.redirect('/nosorce')
      return movie
    } catch (e) {
      console.error(e)
    }
  }
  /**
   * 搜索电影
   * @param {w:string,p:number,s:number} 搜索关键词 、页数、条数
   * @return {counts:number,list:MovieModel} 总数、列表
   */
  async Search ({ w, page = 1, size = 24 }) {
    var reg = new RegExp(w)

    let query = {
      $or: [{ name: { $regex: reg } }]
    }

    if (!w) {
      const res = await this.GetMovies({ page, size })
      return res
    }

    if (w >= 2) {
      query['$or'].concat([
        { actor: { $regex: reg } },
        { director: { $regex: reg } }
      ])
    }

    let skip = (page - 1) * size
    try {
      const counts = await this.Movie.countDocuments(query).exec()
      const list = await this.Movie.find(query).sort({ _id: -1 }).limit(size).skip(skip).exec()
      return { counts, list }
    } catch (error) {
      console.log(error)
    }
  }
  /*
   * 获取分组数据
   * @param {Array} types 编号集合
   * @return {Object} 分组电影数据
   */
  async GetGroup ({ types, page = 1, size = 10 }) {
    let query = {}
    let skip = (page - 1) * size
    if (!types) {
      query = {}
    } else {
      query = { Type: { $in: types } }
    }
    try {
      const res = await this.Group.find(query)
        .populate('Group', { name: 1, area: 1, year: 1, img: 1, cover: 1 })
        .limit(size)
        .skip(skip)
        .exec()
      return res
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 创建电影分组
   * @param {Number} Type 编号
   * @param {String} Describe 描述
   * @param {String} Name 名称
   * @param {Array} Group 电影组
   * @return {Object} 储存的分组
   */
  async CreateGroup (_group) {
    try {
      const typeExist = await this.Group.findOne({ Type: _group.Type }).exec()
      if (!typeExist) {
        const group = new this.Group(_group)
        let isSave = group.save()
        return isSave
      } else {
        return 1
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   修改电影分组
   *@param {Number}
   * @param {String} Describe 描述
   * @param {String} Name 名称
   * @param {Array} Group 电影组
   * @return {Object} 修改的分组
   */
  async UpdateGroup (_group) {
    const isExist = await this.createGroup(_group)
    if (isExist !== 1) return isExist
    let update = {}
    for (const [key, value] of Object.entries(_group)) {
      if (key !== 'Type') {
        update[key] = value
      }
    }
    const isUpdate = await this.Group.updateOne(
      { Type: _group.Type },
      { $set: update }
    )
    return isUpdate
  }
  /**
   * 获取专题列表
   * @param {Number} page 页数
   * @param {Number} size 条数
   */
  async GetTopics ({ page = 1, size = 10 }) {
    let skip = (page - 1) * size
    let query = { name: { $regex: /topic/ } }
    const count = await this.Page.find(query).count().exec()
    const list = await this.Page.find(query).limit(size).skip(skip).sort({ _id: -1 }).exec()

    return {
      count,
      list
    }
  }
  /**
   * 获取单个专题
   * @param {string} id
   * @return {object}
   */
  async GetTopic (id) {
    const vod = await this.Page.findOne({ type: id }).exec()
    return vod
  }
}

export default new Home()
