import React from "react";
import ReactDom from "react-dom";
import actions from "@/store/actions/counter"
import {connect} from "@/react-redux"

class Counter extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <button onClick={this.props.incerment}>+</button>
        <span>{this.props.num}</span>
        <button onClick={this.props.decerment}>-</button>
        <button onClick={this.props.asyncAdd}>过一秒</button>
      </div>
    );
  }
}
// connect 是一个高阶组件函数
//把仓库中的状态树映射为当前组件的属性对象
//负责输入 就是把仓库中的状态输入到组件
// let mapStateToProos = state => state.counter;
//把shore的dispatch 方法转换成一个组件的属性对象
// 输出 把用户在组件中的操作发射出去
// 1.
// let mapDispatchToProps = dispatch => ({
//   // increment:() => (actions) 就是 上方 bindActionCreators 的react化
//   increment:() => dispatch({type:types.INCREMENT})
// })
// 2.
// let mapDispatchToProps = actions;
console.log(actions.incerment());
export default connect(
  state => state.counter,
  actions
)(Counter)
