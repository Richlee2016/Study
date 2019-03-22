export default ({ dispatch, getState }) => {
  return function (next) {
    return function (action) {
      console.log('old1===', action, getState())
      next(action)
      console.log('new1===', action, getState())
    }
  }
}
