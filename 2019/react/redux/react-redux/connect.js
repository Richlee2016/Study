import React from 'react'
import { Consumer } from './Provider'
import { bindActionCreator } from '../redux'
export default function (mapStateToProps, mapDispatchToProps) {
  return function (WrapedComponent) {
    return class ProxyComponent extends React.Component {
      render () {
        return (
          <Consumer>
            {
              value => {
                let actions = {}
                const { state, dispatch } = value
                const mystate = mapStateToProps(state)
                if (typeof mapDispatchToProps === 'function') {
                  actions = mapDispatchToProps(dispatch)
                } else if (typeof mapDispatchToProps === 'object') {
                  actions = bindActionCreator(mapDispatchToProps, dispatch)
                }
                return <WrapedComponent {...mystate} {...actions} />
              }
            }
          </Consumer>
        )
      }
    }
  }
}
