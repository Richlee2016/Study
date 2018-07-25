import compose from './compose'
let applyMiddleware = function(...middlewares) {
  return function(createStore) {
    return function(reducer) {
      let store = createStore(reducer);
      let dispatch;
      let middlewareAPI = {
        getState: store.getState,
        dispatch: action => dispatch(action)
      };
      // let mid = middleware(middlewareAPI);
      let mid = middlewares.map(mid => mid(middlewareAPI));
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
       *  (function(action){...1})()
       *  console.log(2);
       * }
       */
      dispatch = compose(mid)(store.dispatch);
      return { ...store, dispatch };
    };
  };
};

export default applyMiddleware;
