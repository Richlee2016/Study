import { createStore } from './redux'
import reducer from './reduxdir/reducers'
import actions from './reduxdir/actions'
import bindActionCreator from './redux/bindActionCreators'
import React from 'react'
import ReactDOM from 'react-dom'
let { getState, dispatch, subscribe } = createStore(reducer)
const newActions = bindActionCreator(actions, dispatch)
class Page extends React.Component {
  constructor (props) {
    super(props)
    this.state = getState()
  }
  componentDidMount () {
    subscribe(() => {
      this.setState(getState())
    })
  }
  render () {
    const { count: { num } } = this.state
    return (
      <div>
        <button onClick={() => { newActions.min(3) }}>-</button>
        <span>{num}</span>
        <button onClick={newActions.add}>+</button>
      </div>
    )
  };
}
ReactDOM.render(<Page />, document.querySelector('#app'))
