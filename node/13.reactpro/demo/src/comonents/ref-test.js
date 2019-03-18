import React, { Component } from 'react'

class App extends Component {
  constructor () {
    super()
    this.objRef = React.createRef()
  }
  componentDidMount () {
    console.log(this.refs.myRef)
    console.log(this.methodRef)
    console.log(this.objRef.current)
  }
  render () {
    return (
      <div className='ref-test'>
        <div ref='myRef'>1</div>
        <div ref={ele => (this.methodRef = ele)}>2</div>
        <div ref={this.objRef}>3</div>
      </div>
    )
  }
}

export default App
