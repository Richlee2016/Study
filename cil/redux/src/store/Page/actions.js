import {
  ADD,
  MINUS
} from './types'

export const add = () => {
  return {
    type: ADD
  }
}

export const minus = () => {
  return {
    type: MINUS
  }
}

const _timer = time => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export function asyncAdd () {
  return async dispatch => {
    await _timer(100)
    dispatch(add())
  }
}
