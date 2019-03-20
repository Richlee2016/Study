import React from 'react'
const { Provider, Consumer } = React.createContext('default')
export default class ProviderRedux extends React.Component {
  constructor (props) {
    super(props)
    const { getState } = this.props.Store
    this.state = getState()
  }

  componentDidMount () {
    const { getState, subscribe } = this.props.Store
    this.unSubscribe = subscribe(() => {
      this.setState(getState())
    })
  }
  componentWillUnmount () {
    this.unSubscribe()
  }
  render () {
    const { dispatch } = this.props.Store
    return (
      <Provider value={{ state: this.state, dispatch }}>
        {this.props.children}
      </Provider>
    )
  };
}

export {
  Consumer
}
