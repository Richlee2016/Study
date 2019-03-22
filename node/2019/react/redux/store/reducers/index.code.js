import { combineReducers } from '../../redux'
import count from './count'
import name from './name'
export default combineReducers({
  count,
  name
})
