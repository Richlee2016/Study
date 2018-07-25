import redux from "@/redux";
import reducers from "./reducers"
// let store = redux.createState(reducers);
// 中间件 原理  重写 dispatch
/**
 * 1.方便对仓库进行扩展
 * 2.支持添加多个中间件
 */
// let dispatch = store.dispatch;
// store.dispatch = function(action){
    //     console.log('old===',store.getState());
    //     dispatch(action);
    //     console.log('new===',store.getState());
    // }
    
    /**
     * 获取仓库状态  派发动作  调用下一个中间件  action
     */
    let logger1 = function({dispatch,getState}){
        return function(next){
            return function(action){
                console.log('old===',store.getState());
                //为上一个 dispatch 函数
                next(action);
                console.log('new===',store.getState());
            } 
        }
    }
    let logger2 = function({dispatch,getState}){
        return function(next){
            return function(action){
                console.log('old2===',store.getState());
                //next 为 原来的dispatch
                next(action);
                console.log('ne2===',store.getState());
            } 
        }
    }
    const compose = (fns) => {
        if(fns.length == 1) return fns[0];
        return fns.reduce((a,b) => (...arg) => a(b(...arg)));
    }
    let applyMiddleware = function(...middlewares){
        return function(createStore){
            return function(reducer){
                let store = createStore(reducer);
                let dispatch;
                let middlewareAPI = {
                    getState:store.getState,
                    dispatch:action => dispatch(action)
                }
                // let mid = middleware(middlewareAPI); 
                let mid = middlewares.map(mid => mid(middlewareAPI))
                //这层的处理 只是 把 dispatch 转化为next 调用
                //compose 是组合函数 
                /**
                 * next2(store.dispatch) ===> 返回一个函数 fucntion(action){...1} 
                 * ||
                 * ||接收上方的返回结果
                 * next1(function(action){...})
                 * ||
                 * 最后转化成
                 * function(action){
                 *  console.log(1);
                 *  (function(action){...1})
                 *  console.log(2);
                 * }
                 */
                dispatch = compose(mid)(store.dispatch) 
                return {...store,dispatch};
            }
        }
    }
    // let store = redux.createState(reducers);
    let store = applyMiddleware(logger1,logger2)(redux.createState)(reducers);
    export default store;
    