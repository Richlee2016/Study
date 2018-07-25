import {takeEvery,all,call} from '.0.16.0@redux-saga/effects'
import * as types from '@/store/action-types'
const delay = time => new Promise(resolve => setTimeout(resolve,time));
export function* add(dispatch,action){
    // setTimeout(() => {
    //     dispatch({type:types.INCERMENT})
    // },1000)
    //命令saga中间件立刻调用delay方法 并且传入1000
    yield call(delay,1000);
    dispatch({type:types.INCERMENT})
}

export function* watchAdd(dispatch){
    //用来监听特定的动作
    yield takeEvery(types.ADD_ASYNC,add,dispatch)
}

export function* log(dispatch,getState,action){
    console.log(action);
    console.log("state",getState());
}

export function* watchAndLog(dispatch,getState){
    yield takeEvery('*',log,dispatch,getState);
}

export function* rootSaga({dispatch,getState}){
    yield all([watchAdd(dispatch),watchAndLog(dispatch,getState)]);
}