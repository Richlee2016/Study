import { takeEvery, all, call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as types from './types'
const delay = time => new Promise(resolve => setTimeout(resolve, time))

export function * add (dispatch) {
  yield call(delay, 1000)
  yield put({ type: types.ADD })
  yield put(push('/box'))
}

export function * watchAdd (dispatch) {
  yield takeEvery(types.ADD_ASYNC, add, dispatch)
}

export function * log (dispatch, getState, action) {
  console.log(getState().count)
  console.log(action)
  console.log(getState().count)
}

export function * watchAndLog (dispatch, getState) {
  yield takeEvery('*', log, dispatch, getState)
}

export function * rootSaga ({ dispatch, getState }) {
  yield all([watchAdd(dispatch), watchAndLog(dispatch, getState)])
}
