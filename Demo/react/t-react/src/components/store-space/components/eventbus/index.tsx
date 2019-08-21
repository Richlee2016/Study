import React from 'react';
import Son from './components/son';
import { eventBus } from './bus';
import { Button } from 'antd';

const evnetTypes = eventBus.getAllType();

type IProps = {};

type IState = {
  title: string;
  num: number;
};

export default class App extends React.Component<IProps, IState> {
  public state: IState = {
    title: 'father',
    num: 0,
  };

  private busDriver = [
    {
      type: evnetTypes.index.CHANGE_TITLE,
      cb: (title: string) => {
        this.setState({
          title: title,
        });
      },
    },
    {
      type: evnetTypes.index.ADD_NUM,
      cb: (addNum: number) => {
        const { num } = this.state;
        this.setState({
          num: num + addNum,
        });
      },
    },
  ];
  // 监听事件
  componentWillMount() {
    this.busDriver.forEach(driver => {
      eventBus.on(driver.type, driver.cb);
    });
  }
  // 销毁事件
  componentWillUnmount() {
    eventBus.offAll();
  }

  sendSonMsg = () => {
    eventBus.fire(evnetTypes.son.CHANGE_TITLE, 321);
  };

  grandSonAdd = () => {
    eventBus.fire(evnetTypes.grandson.BOX_NUM, 1);
  };

  offPageEvent = () => {
    eventBus.typeOff('index');
  };

  render() {
    return (
      <div>
        <h3>{this.state.title}</h3>
        <p>{this.state.num}</p>
        <Button onClick={this.sendSonMsg}>事件传递</Button>
        <Button onClick={this.grandSonAdd}>孙子叠加</Button>
        <Button onClick={this.offPageEvent}>卸载这个组件的事件</Button>
        <Son />
      </div>
    );
  }
}
