import React from 'react'
import { observer, inject } from 'mobx-react'

@inject('rootStore')
@observer
class Index extends React.Component {
  constructor (props) {
    super(props)
    this.Store = this.props.rootStore.Store.get('Home/Index')
    console.log(this.Store)
  }
  // 视图
  render () {
    const { num, add, minus, asyncAdd } = this.Store
    return (
      <div>
        <button onClick={add}>+</button>
        <button onClick={minus}>-</button>
        <button onClick={asyncAdd}>async+</button>
        <span>{num}</span>
      </div>
    )
  }
}

export default Index
