
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers/index'
import { rootSaga } from './sagas'
import { routerMiddleware } from 'react-router-redux'
import { createHashHistory } from 'history'
let HashHistory = createHashHistory()
let middlewareRouter = routerMiddleware(HashHistory)
const sagaMiddleware = createSagaMiddleware()
const Store = createStore(
  reducers,
  {},
  applyMiddleware(
    sagaMiddleware,
    middlewareRouter
  )
)
sagaMiddleware.run(rootSaga, Store)
export default Store
