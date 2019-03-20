import * as types from '../types'
export default (state = { num: 0 }, action) => {
  switch (action.type) {
    case types.MIN:
      state = { ...state, num: state.num - action.num }
      return state
    case types.ADD:
      state = { ...state, num: ++state.num }
      console.log(state)
      return state
    default:
      return state
  }
}
