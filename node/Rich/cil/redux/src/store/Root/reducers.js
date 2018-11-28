import {
  ADD,
  MINUS,
  SAYNAME,
  FETCHLIST
} from './types'

const INITIAL_STATE = {
  num: 0,
  name: '',
  List: []
}

export default function page (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 3
      }
    case MINUS:
      return {
        ...state,
        num: state.num - 1
      }
    case SAYNAME:
      return {
        ...state,
        name: state.name + action.payloud.name
      }
    case FETCHLIST:
      return {
        ...state,
        List: action.payloud.list
      }
    default:
      return state
  }
}
