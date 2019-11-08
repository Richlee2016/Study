import React from 'react'
import Son from './components/son'
// import propTypes from 'prop-types'
const { Provider, Consumer } = React.createContext('default')
export default class Father extends React.Component {
  // // 老版  context
  // getChildContext () {
  //   return { value: 'box' }
  // }
  constructor (props) {
    super(props)
    this.state = {
      good: {
        nice: 1
      }
    }
  }
  render () {
    const { good } = this.state
    return (
      <div>
        <Provider value={good} >
          <Son />
        </Provider>
      </div>
    )
  }
}

export const Con = Consumer
// // 老版  context
// Father.childContextTypes = {
//   value: propTypes.string
// }
