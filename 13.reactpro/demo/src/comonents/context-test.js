import React, { Component } from 'react'
import MyContext from './myContext'

// TODO:没搞清楚这个传值是什么情况
export default class Parent extends Component {
  constructor () {
    super()
    this.state = {
      box: 1555
    }
  }
  componentDidMount () {
    this.setState({
      box: 54
    })
  }
  render () {
    console.log(this.state.box)
    return (
      <div>
        <div>555</div>
        <MyContext.Provider value={this.state.box} />
        <Child />
      </div>
    )
  }
}

function Child () {
  return (
    <div>
      <MyContext.Consumer>{(value, a) => {
        console.log(111, value)
        return <p>newContext==={value}</p>
      }}</MyContext.Consumer>
    </div>
  )
}
