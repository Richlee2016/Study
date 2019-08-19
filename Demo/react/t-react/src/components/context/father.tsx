import React from 'react';
import Son from './son';
import TwoSon from './two';
type IProps = {};

type IState = {};
// Todo 使用import 报错
export default class Father extends React.Component<IProps, IState> {
  // public lazy: any;
  // constructor(props: IProps) {
  // super(props);
  // this.lazy = React.lazy(() => import/('./lazy'));
  // }
  render() {
    return (
      <div>
        <Son />
        <TwoSon />
      </div>
    );
  }
}
