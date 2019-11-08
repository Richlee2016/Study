/**
 * 当路由相同的时候 显示一个 下边的就不会显示了
 */

import React from 'react'
import pathReg from 'path-to-regexp'
import { HashConsumer } from './HashRouter'
export default class Switch extends React.Component {
  render () {
    return (
      <HashConsumer>
        {value => {
          const { pathname } = value.location
          return this.props.children.map(o => {
            const { path } = o.props
            if (pathReg(path, [], { end: false }).test(pathname)) return o
            return null
          })
          // let children = this.props.children
          // for (let i = 0; i < children.length; i++) {
          //   const child = children[i]
          //   const { path, exact } = child.props
          //   if (pathReg(path, [], { end: exact }).test(value.pathname)) {
          //     return child
          //   }
          //   return null
          // }
        }}
      </HashConsumer>
    )
  }
}
