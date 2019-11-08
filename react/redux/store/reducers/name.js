import * as types from '../types'
export default (state = { name: 'RICH' }, action) => {
  switch (action.type) {
    case types.RICH:
      state = { ...state, name: 'RICH' }
      return state
    case types.LEE:
      state = { ...state, name: 'LEE' }
      console.log(state)
      return state
    default:
      return state
  }
}
