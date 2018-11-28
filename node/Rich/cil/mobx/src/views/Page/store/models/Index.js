import { observable, action, runInAction, computed } from 'mobx'
import { Map } from 'core-js'

const _timer = time => new Promise((resolve, reject) => setTimeout(resolve, time))

export default class Index {
  constructor (root) {
    this.Root = root
  }

  @observable num = 0
  @observable goMap = new Map()

  @computed get numName () {
    return this.num + 'rich'
  }

  @action.bound
  add () {
    this.num++
  }
  @action.bound
  minus () {
    this.num--
  }
  @action.bound
  setBox () {
    this.goMap.set(this.num, 'gogo' + this.num)
    console.log(this.goMap)
  }
  @action.bound
  async asyncAdd () {
    await _timer(1000)
    runInAction(() => {
      this.num++
    })
  }

  @action.bound
  goIndex () {
    console.log(this.Root.$router.get())
    this.Root.$router.get().push('/')
  }
}
