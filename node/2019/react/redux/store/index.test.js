import { createStore } from '../redux'
import reducers from './reducers/index'
import { applyMiddleware } from 'redux'
// const Store = createStore(reducers)
// 中间件的本质 即是  改变dispatch
// let dispatch = Store.dispatch
// Store.dispatch = action => {
//   console.log('old===', action, Store.getState())
//   dispatch(action)
//   console.log('new===', action, Store.getState())
// }
// 中间件的本质 即是  改变dispatch

const compose = (fns) => {
  if (fns.length === 1) return fns[0]
  return fns.reduce((a, b) => (...arg) => a(b(...arg)))
}

let logger1 = function ({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      console.log('old1===', action, getState())
      // 上一个 dispatch 函数
      next(action)
      console.log('new1===', action, getState())
    }
  }
}

let logger2 = function ({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      console.log('old2===', action, getState())
      // 上一个 dispatch 函数
      next(action)
      console.log('new2===', action, getState())
    }
  }
}

let applyMiddlewareTest = function (...middlewares) {
  return function (createStore) {
    return function (reducer) {
      let store = createStore(reducer)
      let dispatch
      let middlewareAPI = {
        getState: store.getState,
        dispatch: action => dispatch(action) // 修改过后的dispatch
      }
      // 此步  是得到 一个
      /**
       function(next){
           return function (action) {
            console.log('old2===', action, getState())
            next(action) //store.dispatch
            console.log('new2===', action, getState())
            }
       } 数组
       */
      let mid = middlewares.map(mid => mid(middlewareAPI))
      // 此步 是 中间件 进行叠加
      /**
        function (action) {
            console.log('old1===', action, getState())
            (function (action) {
            console.log('old2===', action, getState())
            next(action) //store.dispatch
            console.log('new2===', action, getState())
            })()
            console.log('new1===', action, getState())
        }
        数组
       */
      dispatch = compose(mid)(store.dispatch) // 传入最初的 dispatch 进行一层一层的叠加修改

      return { ...store, dispatch } // store 返回原来的api  想你的dispatch 将老的 dispatch 覆盖
    }
  }
}

let Store = applyMiddleware(logger1, logger2)(createStore)(reducers)
export default Store
