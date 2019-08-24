import React from 'react';

interface IProps {}
interface IState {
  // 组件 xy
  bc: number[];
  // 上一次组件 xy
  tc?: number[];
  // 鼠标 xy
  mc?: number[];
}
export default function BaseDrag<T>(Wrapper: React.ComponentType<T>) {
  return class DragNode extends React.Component<IProps & T, IState> {
    private dragNode: React.RefObject<any> = React.createRef();

    public state: IState = {
      bc: [0, 0],
    };
    // 按下
    mouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      
    };
    // 移动
    mouseMove = (e: MouseEvent) => {
     
    };
    // 抬起
    mouseUp = (e: MouseEvent) => {
      
    };
    getNodeClient = () => {
      
    };
    render() {
      const { bc } = this.state;
      return (
        <div
          ref={this.dragNode}
          className="drag-outer"
          onMouseDown={this.mouseDown}
          style={{ left: bc[0], top: bc[1] }}>
          <Wrapper {...this.props} />
        </div>
      );
    }
  };
}
