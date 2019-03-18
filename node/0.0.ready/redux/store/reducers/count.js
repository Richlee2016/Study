export default function (state = { num: 0 }, action) {
  switch (action.type) {
    case 'ADD':
      return { num: ++state.num }
    case 'MINUS':
      return { num: --state.num }
    default:
      return state
  }
}
