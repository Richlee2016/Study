import React from 'react'
import { HashConsumer } from './HashRouter'
export default class Redirect extends React.Component {
  render () {
    return (
      <HashConsumer>
        {value => {
          value.history.push('#' + this.props.to)
        }}
      </HashConsumer>
    )
  }
}
