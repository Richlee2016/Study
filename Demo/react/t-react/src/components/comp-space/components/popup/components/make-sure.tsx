import React from 'react';
import PopUpFactory from '../popup-window';
type IProps = {};

type IState = {};

class MakeSure extends React.Component<IProps, IState> {
  render() {
    return <div>makesure</div>;
  }
}

export default PopUpFactory(MakeSure);
