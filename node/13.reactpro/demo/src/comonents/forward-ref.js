import React, { Component } from 'react'

class App extends Component {
  constructor () {
    super()
    this.objRef = React.createRef()
  }
  componentDidMount () {
    console.log(this.objRef)
  }
  render () {
    const Pure = React.forwardRef((props, ref) => (<input type='text' ref={ref} />))
    // 纯函数 是没有 ref 的 需要 包装一下
    // const Pure = (props) => (<input type='text' />)
    return (
      <div className='fprward-ref-test'>
        <Pure ref={this.objRef} />
      </div>
    )
  }
}

export default App
