import React from 'react'
import { Consumer } from './Provider'
export default function (mapStateToProps, mapDispatchToProps) {
  return function (WrapedComponent) {
    return class ProxyComponent extends React.Component {
      render () {
        return (
          <Consumer>
            {
              value => {
                console.log(value)
                return <WrapedComponent />
              }
            }
          </Consumer>
        )
      }
    }
  }
}
