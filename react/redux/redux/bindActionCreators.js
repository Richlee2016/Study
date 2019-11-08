// 为了优化 action 的 dispatch 把dispatch 整合 最后返回一个 拥有dispatch action 的actions 函数对象
/**
 * input
 * {
 * add(){ return {type:'ADD'}},
 * min(){ return {type:'MIN'}}
 * }
 * output
 * {
 * add(){ dispatch({type:'ADD'})}，
 * min(){ dispatch({type:'MIN'})}
 * }
 */

function bindActionCreator (action, dispatch) {
  return function () {
    dispatch(action.apply(this, arguments))
  }
}

export default (actions, dispatch) => {
  let newActions = {}
  for (let [key, action] of Object.entries(actions)) {
    newActions[key] = bindActionCreator(action, dispatch)
  }
  return newActions
}
