import React from 'react'
import { connect } from '../react-redux'
class Count extends React.Component {
  // constructor (props) {
  //   super(props)
  // }
  render () {
    return (
      <div>
        <button>-</button>
        <label>0</label>
        <button>+</button>
      </div>
    )
  }
}

export default connect(1, 2)(Count)
