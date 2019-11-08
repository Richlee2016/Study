import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
class Count extends React.Component {
  // constructor (props) {
  //   super(props)
  // }
  render () {
    const { count, add, min, addAsync } = this.props
    // console.log(this.props)
    return (
      <div>
        <button onClick={() => { min(2) }}>-</button>
        <label>{count.num}</label>
        <button onClick={add}>+</button>
        <button onClick={addAsync}>async +</button>
      </div>
    )
  }
}

export default connect(
  state => ({ count: state.count }),
  // 函数模式
  // dispatch => ({
  //   add () {
  //     dispatch({ type: 'ADD' })
  //   }
  // })
  // 对象模式
  actions
)(Count)
