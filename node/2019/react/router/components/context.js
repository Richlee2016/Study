import React from 'react'
import Son from './son'
export default class Father extends React.Component {
  render () {
    return (
      <div>
        <Son />
      </div>
    )
  }
}
