import React from 'react'
// import propTypes from 'prop-types'
import { Con } from '../context'
export default class Son extends React.Component {
  render () {
    return (
      <div>
        <div>321</div>
        <Con>{value => <p>{JSON.stringify(value)}</p>}</Con>
      </div>
    )
  }
}
// 老版  context
// Son.contextType = {
//   value: propTypes.string
// }
