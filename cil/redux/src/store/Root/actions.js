import {
  ADD,
  MINUS,
  SAYNAME,
  FETCHLIST
} from './types'

import Taro from '@tarojs/taro'

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

export const sayname = name => {
  return {
    type: SAYNAME,
    payloud: {
      name
    }
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

export function fetchList (list) {
  return {
    type: FETCHLIST,
    payloud: {
      list
    }
  }
}

export function asyncFetchList () {
  return async dispatch => {
    let { data } = await Taro.request({ url: 'http://192.168.136.1:7001/Movie/GetGroup?types=1' })
    data = data[0] ? data[0].Group : []
    console.log(data)
    dispatch(fetchList(data))
  }
}
