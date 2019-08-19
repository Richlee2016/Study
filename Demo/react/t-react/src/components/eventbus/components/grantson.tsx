import React from 'react';
import { Button } from 'antd';
import { eventBus, eventTypes } from '../bus';

const evnetTypes = eventBus.getAllType();
type IProps = {};

type IState = {
  num: number;
};

export default class App extends React.Component<IProps, IState> {
  public state: IState = {
    num: 0,
  };
  private busDriver = [
    {
      type: evnetTypes.grandson.BOX_NUM,
      cb: (addNum: number) => {
        const { num } = this.state;
        this.setState({
          num: num + addNum,
        });
      },
    },
  ];
  componentWillMount() {
    this.busDriver.forEach(driver => {
      eventBus.on(driver.type, driver.cb);
    });
  }
  componentWillUnmount() {
    eventBus.off(eventTypes.grandson.BOX_NUM);
  }
  grandPaAdd = () => {
    eventBus.fire(evnetTypes.index.ADD_NUM, 2);
  };
  render() {
    return (
      <div>
        <h3>{'title' + this.state.num}</h3>
        <Button onClick={this.grandPaAdd}>主先叠加</Button>
      </div>
    );
  }
}
