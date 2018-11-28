import React, { Component } from 'react'
import { connect } from 'react-redux'
import { add, minus, asyncAdd, sayname, asyncFetchList } from '@/store/Home/actions'
@connect(({ Home, Page }) => ({
  Home,
  Page
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  },
  sayname (name) {
    dispatch(sayname(name))
  },
  fetchList () {
    dispatch(asyncFetchList(name))
  }
}))

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.a = 1
    console.log(this.props);
  }
  // 视图
  render () {
    return (
      <div>
        123
        <button onClick={this.props.add}>+</button>
        <button onClick={this.props.dec}>-</button>
        <button onClick={this.props.asyncAdd}>-</button>
        <button onClick={() => {this.props.history.push('/page/321')}}>page</button>
        <span>{this.props.Home.num}</span>
      </div>

    )
  }
}
