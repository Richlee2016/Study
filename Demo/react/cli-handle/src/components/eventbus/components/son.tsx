import React from 'react';
import GrantSon from './grantson';
import { Button } from 'antd';

import { eventBus } from '../bus';
type IProps = {};

type IState = {
  title: string;
};

export default class App extends React.Component<IProps, IState> {
  public state: IState = {
    title: 'son',
  };
  componentWillMount() {
    eventBus.on('sonTitle', (title: string) => {
      this.setState({
        title: title,
      });
    });
  }
  componentWillUnmount() {
    eventBus.off('sonTitle');
  }
  handleFtherTitle = () => {
    eventBus.fire('fatherTitle', 'son change father title');
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
