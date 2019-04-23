import React from 'react'
import { Route } from '../react-router'
import One from './one'
export default class Two extends React.Component {
  render () {
    return (
      <div>
        123
        <Route path='/movie/add' component={One} />
      </div>
    )
  }
}
