/**
 * function dispatch(action){
 *  switch(){}  ===> reducer
 * }
 *
 */
// 1.传入一个工程进来
// 2.暴露一个仓库获取器
// 3.暴露一个动作触发器  (初始动作触发获取初始状态)
// 4.每次dispatch动作的时候监听数据的变化 （并且返回一个取消监听的函数）
export default function createState (reducer, preloadedState, enchancer) {
  let state = preloadedState
  let listeners = []

  // 中间件
  if (enchancer && typeof enchancer === 'function') {
    // applyMiddleware(logger1, logger2)(createStore)(reducers)
    return enchancer(createState)(reducer, preloadedState)
  }

  function getState () {
    return state
  }

  function dispatch (action) {
    state = reducer(state, action)
    listeners.forEach(o => o())
  }

  function subscribe (listener) {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(item => item !== listener)
    }
  }
  dispatch('@INIT')

  return {
    getState,
    dispatch,
    subscribe
  }
}
