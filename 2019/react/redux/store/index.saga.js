
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers/index'
import { rootSaga } from './sagas'
const sagaMiddleware = createSagaMiddleware()
const Store = createStore(
  reducers,
  {},
  applyMiddleware(
    sagaMiddleware
  )
)
sagaMiddleware.run(rootSaga, Store)
export default Store
