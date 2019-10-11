import React from 'react';
import { Button } from 'antd';
import AutoFlowCreateWin from './work/auto-flow-create-win';
type IProps = {};

type IState = {
  idx: number;
};

export default class App extends React.Component<IProps, IState> {
  private showList = [AutoFlowCreateWin];
  private showBtn = ['自动化流程-创建流程弹窗'];
  public state: IState = {
    idx: 0,
  };
  render() {
    const btn = this.showBtn.map((b: any, i: number) => (
      <Button
        key={i}
        onClick={() => {
          this.setState({ idx: i });
        }}>
        {b}
      </Button>
    ));
    const Box = this.showList[this.state.idx];
    return (
      <div>
        {btn}
        <Box></Box>
      </div>
    );
  }
}
