import React from 'react'
import { observer, inject } from 'mobx-react'

export default inject('rootStore')(observer(({ rootStore: { Store } }) => {
  const { num, add, minus, asyncAdd } = Store.get('Page/Index')
  return (<div>
    <button onClick={add}>+</button>
    <button onClick={minus}>-</button>
    <button onClick={asyncAdd}>async+</button>
    <span>{num}</span>
  </div>)
}))
