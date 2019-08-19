import React from 'react';
import Son from './components/son';
import { eventBus } from './bus';
import { Button } from 'antd';
type IProps = {};

type IState = {
  title: string;
};

export default class App extends React.Component<IProps, IState> {
  public state: IState = {
    title: 'father',
  };
  componentWillMount() {
    eventBus.on('fatherTitle', (title: string) => {
      this.setState({
        title: title,
      });
    });
  }
  sendSonMsg = () => {
    eventBus.fire('sonTitle', 321);
  };
  render() {
    return (
      <div>
        <h3>{this.state.title}</h3>
        <Button onClick={this.sendSonMsg}>事件传递</Button>
        <Son />
      </div>
    );
  }
}
