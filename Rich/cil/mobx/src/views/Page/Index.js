import React from 'react'
import { observer, inject } from 'mobx-react'
import './index.less'
export default inject('rootStore')(observer(({ rootStore: { Store } }) => {
  const { num, add, minus, asyncAdd, setBox, numName, goIndex } = Store.get('Page/Index')
  return (<div className='Page-page'>
    <button className='myBtn' onClick={add}>+</button>
    <button onClick={minus}>-</button>
    <button onClick={asyncAdd}>async+</button>
    <button onClick={setBox}>setbox</button>
    <span>{num}</span>
    <span>{numName}</span>
    <button onClick={goIndex}>goindex</button>
  </div>)
}))
