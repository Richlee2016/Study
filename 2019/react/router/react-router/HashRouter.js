import React from 'react'
const { Provider, Consumer } = React.createContext('default')
export default class HashRouter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      location: {
        pathname: window.location.hash ? window.location.hash.slice(1) : '/',
        state: {}
      },
      history: {
        push (path) {
          let self = this
          if (typeof path === 'object') {
            const { pathname, state } = path
            this.setState({ location: { ...self.state.location, state } }, () => {
              window.location.href = pathname
            })
          } else {
            window.location.href = path
          }
        }
      }
    }
  }
  componentWillMount () {
    window.location.hash = window.location.hash || '/'
    window.addEventListener('hashchange', () => {
      this.setState({
        location: {
          pathname: window.location.hash ? window.location.hash.slice(1) : '/'
        }
      })
    }, false)
  }
  render () {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}

export const HashConsumer = Consumer
