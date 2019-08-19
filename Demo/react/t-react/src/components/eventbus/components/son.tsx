import React from 'react';
import GrantSon from './grantson';
import { Button } from 'antd';

import { eventBus } from '../bus';
const evnetTypes = eventBus.getAllType();
type IProps = {};

type IState = {
  title: string;
};

export default class App extends React.Component<IProps, IState> {
  public state: IState = {
    title: 'son',
  };

  private busDriver = [
    // 父组件控制子组件添加数字
    {
      type: evnetTypes.son.CHANGE_TITLE,
      cb: (title: string) => {
        this.setState({
          title: title,
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
    eventBus.off(evnetTypes.son.CHANGE_TITLE);
  }
  handleFtherTitle = () => {
    eventBus.fire(evnetTypes.index.CHANGE_TITLE, 'son change father title');
  };
  render() {
    return (
      <div>
        <h3>{this.state.title}</h3>
        <Button onClick={this.handleFtherTitle}>son handle father</Button>
        <GrantSon />
      </div>
    );
  }
}
