import React, { Fragment } from 'react';
import BaseDrag from './transform-drag';
import { Button } from 'antd';
import './index.less';
type IProps = {};

type IState = {
  group: ReturnType<typeof BaseDrag>[];
};

function Box(props: {}) {
  return <div className="drag-item"></div>;
}

export default class DragPage extends React.Component<IProps, IState> {
  private dragContent: React.RefObject<any> = React.createRef();
  public state: IState = {
    group: [],
  };
  componentDidMount() {}

  addDragBox = () => {
    const DragBox = BaseDrag(Box);
    const { group } = this.state;
    group.push(DragBox);
    this.setState({
      group,
    });
  };
  render() {
    const { group } = this.state;
    const dragBoxMap = group.map((Drag, i) => {
      return (
        <Fragment key={i}>
          <Drag />
        </Fragment>
      );
    });
    return (
      <>
        <Button onClick={this.addDragBox}>add</Button>
        <Box />
        <div className="drag-wrapper" ref={this.dragContent}>
          {dragBoxMap}
        </div>
      </>
    );
  }
}
