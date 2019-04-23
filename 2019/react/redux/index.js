import React from 'react'
import ReactDOM from 'react-dom'
import Count from './components/count'
import Store from './store'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { createHashHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
let HashHistory = createHashHistory()
const history = syncHistoryWithStore(HashHistory, Store)
ReactDOM.render(
  <Provider store={Store}>
    <Router history={history}>
      <Switch>
        <Route path='/home' component={Count} />
        <Route path='/box' component={Count} />
      </Switch>
    </Router>
  </Provider>
  , document.querySelector('#app'))
