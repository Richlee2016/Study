import React from 'react'
// import { HashConsumer } from './HashRouter'
export default class Link extends React.Component {
  render () {
    // return (
    //   <HashConsumer>
    //     {value => {
    //       let goPage = () => {
    //         value.history.push('#' + this.props.to)
    //       }
    //       return <a onClick={goPage}>{this.props.children}</a>
    //     }}
    //   </HashConsumer>
    // )
    return <a href={'#' + this.props.to}>{this.props.children}</a>
  }
}
