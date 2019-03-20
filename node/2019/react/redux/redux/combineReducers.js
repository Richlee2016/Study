// 合并 reducers 为一个单独的reducer
// 合并 states 为整个state
/**
 * input
 * count reducer(state={num:0},actions)
 * name reducer(state={name:'rich'},actions)
 * output
 * {
 *  count:{num:0}，
 *  name:{name:'rich'}
 * }
 */

// reducers 返回值就是每个 state
export default (reducers) => {
  return function (state = {}, action) {
    //   state  在初始dispach 之后 state = { num:0 }
    return Object.keys(reducers).reduce((newState, key) => {
      // newState[count] = reducers[count]({num:0},action)
      // reducer 始终修改单独的值
      // state[key] 初始状态实际上为 undifind
      newState[key] = reducers[key](state[key], action)
      return newState
    }, {})
  }
}
