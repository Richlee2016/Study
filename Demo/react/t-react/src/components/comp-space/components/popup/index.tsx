import React from 'react';
import { Button } from 'antd';
import MakeSure from './components/make-sure';
type IProps = {};

type IState = {};

export default class Popup extends React.Component<IProps, IState> {
  showMakeSure = () => {
    MakeSure.show({
      onShown: () => {
        console.log(321);
      },
      onClosed: () => {
        console.log(654);
      },
    });
  };
  hideMakeSure = () => {
    MakeSure.hide();
  };
  render() {
    return (
      <div>
        <Button onClick={this.showMakeSure}>show</Button>
        <Button onClick={this.hideMakeSure}>hide</Button>
      </div>
    );
  }
}
