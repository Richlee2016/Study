import compose from './compose'
export default (...middlewares) => (createStore) => (reducers) => {
  let dispatch
  const store = createStore(reducers)
  const Api = {
    getState: store.getState,
    dispatch: action => dispatch(action)
  }
  const mid = middlewares.map(mid => mid(Api))
  dispatch = compose(mid)(store.dispatch)
  return { ...store, dispatch }
}
