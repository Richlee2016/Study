/**
 *
 * @param {Function} reducers
 * @return {Object} newState
 */
export default function (reducers) {
  return function (state = {}, action) {
    let newState = {}
    for (const key in reducers) {
      newState[key] = reducers[key](state[key], action)
    }
    return newState
  }
}
