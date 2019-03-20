import { createStore } from './redux'
// import React from 'react'
// import ReactDOM from 'react-dom'
// import Count from './components/count'
// class Page extends React.Component {
//   render () {
//     return (
//       <div>
//         <Count />
//       </div>
//     )
//   };
// }
// ReactDOM.render(<Page />, document.querySelector('#app'))

// reducer 机械工程
// 1.把state以及所有的逻辑全部丢进去,进行一个仓库的创建，并且每个操作返回state
// 2.只是为了吧仓库封印再内部后边的action只需要传入动作即可 动reducer进行修改state
import reducer from './reduxdir/reducer'
import actions from './reduxdir/actions'
import bindActionCreator from './redux/bindActionCreators'
let { getState, dispatch, subscribe } = createStore(reducer)
const newActions = bindActionCreator(actions, dispatch)
const minBtn = document.querySelector('#min')
const box = document.querySelector('#box')
const addBtn = document.querySelector('#add')

function render () {
  let store = getState()
  box.innerHTML = store.num
}

// 添加一个监听函数
subscribe(render)

// 没有监听函数的时候需要自己触发 render
minBtn.onclick = function () {
  newActions.min(2)
  // render()
}
addBtn.onclick = function () {
  newActions.add()
  // dispatch({ type: 'ADD' })
  // render()
}
// 没有监听函数的时候需要自己触发 render

render()
