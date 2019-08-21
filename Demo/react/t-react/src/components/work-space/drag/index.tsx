import React from 'react';
import './drag.less';
type IProps = {};

type IState = {
  outerSize: number[];
};

export default class Drag extends React.Component<IProps, IState> {
  public state: IState = {
    outerSize: [140, 140],
  };

  dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log('进入');
    console.log(e);
    // this.setState({
    //   outerSize: [200, 200],
    // });
  };

  dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log('离开');
    // this.setState({
    //   outerSize: [140, 140],
    // });
  };

  dragSendData = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('Text', 'nice');
  };

  dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  dropHandle = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('Text');
    console.log(data);
  };

  render() {
    // const { outerSize } = this.state;
    return (
      <div>
        <div className="box" draggable></div>
        <div
          className="outer-box"
          onDragEnter={this.dragEnter}
          onDragLeave={this.dragLeave}></div>
        {/* <div
          style={{ width: outerSize[0], height: outerSize[1] }}
          className="outer-box"
          onDragOver={this.dragOver}
          onDrop={this.dropHandle}></div> */}
      </div>
    );
  }
}
