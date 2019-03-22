import * as types from './types'

export const add = () => ({ type: types.ADD })
export const min = num => ({ type: types.MIN, num })
export const addAsync = num => ({ type: types.ADD_ASYNC })
// export const asyncAdd = () => (dispatch, getState) => {
//   setTimeout(() => {
//     dispatch(add())
//   }, 2000)
// }
