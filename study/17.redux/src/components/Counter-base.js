import React from "react";
import ReactDom from "react-dom";
import store from "../store";
import counterActions from "@/store/actions/counter"
import redux from "@/redux";
import {connect} from "@/react-redux"
let actions = redux.bindActionCreators(counterActions,store.dispatch);
export default class Counter extends React.Component {
  constructor() {
    super();
    this.state = { counter: store.getState().counter };
  }

  componentDidMount() {
    //   在组件挂载的时候  执行 订阅  更新视图
    this.unsubscribe = store.subscribe(() => {
      this.setState({ counter: store.getState().counter });
    });
  }
  componentWillUnmount() {
    //   组件卸载  的 时候 取消订阅
    this.unsubscribe();
  }

  render() {
    const { counter } = this.state;
    return (
      <div>
        <button onClick={actions.incerment}>+</button>
        <span>{counter.num}</span>
        <button onClick={actions.decerment}>-</button>
      </div>
    );
  }
}
