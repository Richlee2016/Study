import React from 'react'
import ReactDOM from 'react-dom'
import Count from './components/count'
import Store from './store'
import { Provider } from './react-redux'
class Page extends React.Component {
  render () {
    return (
      <Provider Store={Store}>
        <Count />
      </Provider>
    )
  };
}
ReactDOM.render(<Page />, document.querySelector('#app'))
