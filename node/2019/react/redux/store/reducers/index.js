import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import count from './count'
import name from './name'
export default combineReducers({
  count,
  name,
  routing: routerReducer
})
