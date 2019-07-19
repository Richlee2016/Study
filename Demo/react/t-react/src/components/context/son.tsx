import React from 'react';
import { Context } from './context';
type IProps = {};

type IState = {};

export default class Son extends React.Component<IProps, IState> {
  render() {
    return (
      <Context.Consumer>
        {value => {
          const { box } = JSON.parse(value);
          return <div>1 ====>使用consumer传值{box}</div>;
        }}
      </Context.Consumer>
    );
  }
}
