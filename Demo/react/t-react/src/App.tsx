import React from "react";

type IProps = {};

type IState = {};

export default class App extends React.Component<IProps, IState> {
  render() {
    return <div>{this.props.children}</div>;
  }
}
