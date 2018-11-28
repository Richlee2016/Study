import { observable } from 'mobx'
import { createHashHistory } from 'history'
import Home from '@/views/Home/store'
import Page from '@/views/Page/store'
import Nice from '@/views/Nice/store'

let GroupStore = []
// 组 store spacename/name
const GROUP = [Home, Page]
// 单 store name
const SINGLE = [Nice]
GROUP.forEach(g => {
  g.group.forEach(o => {
    o['spacename'] = `${g.namespace}/${o.name}`
    GroupStore.push(o)
  })
})

SINGLE.forEach(o => {
  o['spacename'] = o.name
  GroupStore.push(o)
})

export default class RootStore {
  constructor () {
    let storeMap = new Map()
    GroupStore.forEach(Store => {
      storeMap.set(Store.spacename, new Store(this))
    })
    this.Store = storeMap
    console.log(createHashHistory())
    this.$router = observable.box(createHashHistory())
  }
}
