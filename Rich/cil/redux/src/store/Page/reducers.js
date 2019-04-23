import { ADD, MINUS } from './types'

const INITIAL_STATE = {
  num: 0
}

export default function page (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 2
      }
    case MINUS:
      return {
        ...state,
        num: state.num - 1
      }
    default:
      return state
  }
}
