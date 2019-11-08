import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createHashHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import Root from './Root/reducers'
import Home from './Home/reducers'
import Page from './Page/reducers'

const history = createHashHistory()

const rootReducer = combineReducers({
  Root,
  Home,
  Page
})

const middlewares = [
  thunkMiddleware,
  createLogger()
]

export default function configStore () {
  const store = createStore(
    connectRouter(history)(rootReducer),
    compose(
      applyMiddleware(
        routerMiddleware(history),
        ...middlewares
      )
    ))
  return store
}
