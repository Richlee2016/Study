import React from 'react'
import ReactDOM from 'react-dom'
import Father from './context'
class Page extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Father />
      </React.Fragment>
    )
  };
}
ReactDOM.render(<Page />, document.querySelector('#app'))
