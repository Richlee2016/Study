import React, { Component } from 'react'
import './App.css'
import RefTest from './comonents/ref-test'
import ForWardRef from './comonents/forward-ref'
import ContextTest from './comonents/context-test'
class App extends Component {
  render () {
    return (
      <div className='App'>
        <RefTest />
        <ForWardRef />
        <ContextTest />
      </div>
    )
  }
}

export default App
