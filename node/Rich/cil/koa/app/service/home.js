
class Index {
  constructor () {
    this.name = 1
  }
  async fetchMovie () {
    const res = await MovieHome.findOne({ id: 3 }, { name: 1, id: 1 }).exec()
    return res
  }
}

export default new Index()
