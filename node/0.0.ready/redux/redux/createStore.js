export default function createState (reducer, preloadedState) {
  let state = preloadedState
  let listeners = []

  function getState () {
    return JSON.parse(JSON.stringify(state))
  }

  function dispatch (action) {
    state = reducer(state, action)
    listeners.forEach(sub => sub())
  }

  function subscribe (sub) {
    listeners.push(sub)
    return function () {
      listeners = listeners.filter(item => item != sub)
    }
  }
  dispatch({ type: '@INIT' })

  return {
    getState,
    dispatch,
    subscribe
  }
}
