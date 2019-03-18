import React from 'react'
import { Redirect } from '../react-router'
export default class Three extends React.Component {
  render () {
    const { match: { params } } = this.props
    return (
      <div>
          Three{params.id}
        <div>
          {
            params.id == 4 ? <Redirect to='/movie' /> : null
          }
        </div>
      </div>
    )
  }
}
