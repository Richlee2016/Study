import React from 'react';
import BaseDrag from './drag';
import './index.less';
type IProps = {};

type IState = {};

class Box extends React.Component<IProps, IState> {
  render() {
    return <div className="drag-item"></div>;
  }
}

export default BaseDrag(Box);
