import React, { Component } from 'react'
export default class Index extends Component {
  constructor (props) {
    super(props)
    this.a = 1
    console.log(this.props)
  }
  render () {
    return (
      <div>
       page
      </div>

    )
  }
}
