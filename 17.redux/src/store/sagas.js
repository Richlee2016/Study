import {takeEvery,all,call,put,take} from '.0.16.0@redux-saga/effects'
import * as types from '@/store/action-types'
const delay = time => new Promise(resolve => setTimeout(resolve,time));
export function* add(){
    // setTimeout(() => {
    //     dispatch({type:types.INCERMENT})
    // },1000)
    //命令saga中间件立刻调用delay方法 并且传入1000
    yield call(delay,300);
    // put相当于 dispatch
    yield put({type:types.INCERMENT})
}

export function* watchAdd(){
    //用来监听特定的动作
    yield takeEvery(types.ADD_ASYNC,add)
}

export function* log(getState,action){
    console.log(action);
    console.log("state",getState());
}

export function* watchAndLog(getState){
    yield takeEvery('*',log,getState);
}

export function* watchAddEnd(){
    for(let i=0;i<3;i++){
        // tack  只监听一次
        yield take(types.ADD_ASYNC)
        yield add();
    }
}

export function* rootSaga({getState}){
    // yield all([watchAdd(),watchAndLog(getState)]);
    yield all([watchAddEnd()])
}