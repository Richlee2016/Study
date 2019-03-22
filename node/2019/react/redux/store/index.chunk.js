import { createStore, applyMiddleware } from '../redux'
import logger from './middlware/logger'
import reduxThunk from './middlware/redux-chunk'
import reducers from './reducers/index'
const Store = createStore(
  reducers,
  {},
  applyMiddleware(
    reduxThunk,
    logger
  )
)
// let Store = applyMiddleware(logger)(createStore)(reducers)
export default Store
