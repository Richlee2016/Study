import React from 'react'
import pathToRegExp from 'path-to-regexp'
import { HashConsumer } from './HashRouter'
export default class Routs extends React.Component {
  constructor (props) {
    super(props)
    // exact 完全匹配
    const { path, exact = false } = this.props
    let keys = []
    this.reg = pathToRegExp(path, keys, { end: exact })
    this.keys = keys.map(o => o.name)
  }
  render () {
    let { component: Component, children } = this.props
    return (
      <HashConsumer>
        {value => {
          const { pathname } = value.location
          let res = pathname.match(this.reg)
          let [url, ...val] = res || []
          if (res) {
            let pathprops = {
              location: value.location,
              history: value.history,
              match: {
                url,
                params: this.keys.reduce((memo, key, idx) => {
                  memo[key] = val[idx]
                  return memo
                }, {})
              }
            }
            return <Component {...pathprops} />
          } else {
            if (children) {
              return children(this.props)
            } else {
              return null
            }
          }
        }}
      </HashConsumer>
    )
  }
}
