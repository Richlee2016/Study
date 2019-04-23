import redux from "@/redux";
import reducers from "./reducers";
import applyMiddleware from "../redux/applyMiddleware";

let logger = function({ dispatch, getState }) {
  return function(next) {
    return function(action) {
      console.log("old===", store.getState());
      //为上一个 dispatch 函数
      next(action);
      console.log("new===", store.getState());
    };
  };
};

// redux-chunk
let thunk = ({dispatch,getState}) => next => action => {
    if(typeof action == 'function'){
        action(dispatch,getState);
    }else{
        next(action);
    };
}
// redux-promise
let promise =  ({dispatch,getState}) => next => action => {
    if(action.then && typeof action.then == 'function'){
        action.then(data => {
          dispatch(data);
        });
    }else if(action.payload&& action.payload.then&& typeof action.payload.then == 'function'){  
      // 把payload 变为 promise 再决定 resolve 或者 reject  进行dispatch
      action.payload.then(payload => dispatch({...action,payload}),payload => dispatch(...action,payload));
    }else{
        next(action);
    };
}
// 
// let store = redux.applyMiddleware(promise,thunk,logger)(redux.createState)(reducers);
// enchancer => 只是换了一个钟写法
let store = redux.createState(reducers,{num:0},redux.applyMiddleware(promise,thunk,logger))
export default store;
