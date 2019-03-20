import * as types from './types'
export default {
  add () {
    return { type: types.ADD }
  },
  min (num) {
    return { type: types.MIN, num }
  }
}
