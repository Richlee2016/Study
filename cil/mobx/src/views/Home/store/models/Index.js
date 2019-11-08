import { observable, action, runInAction } from 'mobx'

const _timer = time => new Promise((resolve, reject) => setTimeout(resolve, time))

export default class Index {
  constructor (root) {
    this.Root = root
  }

  @observable num = 0

  @action.bound
  add () {
    this.num++
  }
  @action.bound
  minus () {
    this.num--
  }
  @action.bound
  async asyncAdd () {
    await _timer(1000)
    runInAction(() => {
      this.num++
    })
  }
}
