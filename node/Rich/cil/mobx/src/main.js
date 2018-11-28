import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Switch, HashRouter } from 'react-router-dom'
import App from '@/views/App'
import RootStore from '@/stores'

const rootStore = new RootStore()

ReactDOM.render(
  <Provider rootStore={rootStore}>
    <HashRouter>
      <Switch>
        <App />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('app')
)
