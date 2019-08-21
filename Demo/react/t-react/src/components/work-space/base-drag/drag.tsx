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
      const { bc } = this.state;
      this.setState(
        {
          mc: [e.clientX, e.clientY],
          tc: bc,
        },
        () => {
          document.addEventListener('mousemove', this.mouseMove, false);
          document.addEventListener('mouseup', this.mouseUp, false);
        }
      );
    };
    // 移动
    mouseMove = (e: MouseEvent) => {
      const { mc, tc } = this.state;
      const { clientX, clientY } = e;
      if (mc && mc.length && tc && tc.length) {
        const [nx, ny] = this.getNodeClient();
        const bcx = tc[0] + (clientX - mc[0]);
        const bcy = tc[1] + (clientY - mc[1]);
        const isMinX = nx <= 0 && clientX - mc[0] < 0;
        const isMinY = ny <= 0 && clientY - mc[1] < 0;
        this.setState({ bc: [isMinX ? 0 : bcx, isMinY ? 0 : bcy] });
      }
    };
    // 抬起
    mouseUp = (e: MouseEvent) => {
      this.setState(
        {
          mc: undefined,
        },
        () => {
          document.removeEventListener('mousemove', this.mouseMove);
          document.removeEventListener('mouseup', this.mouseUp, false);
        }
      );
    };
    getNodeClient = () => {
      const outer = this.dragNode.current as HTMLElement;
      return [outer.offsetLeft, outer.offsetTop];
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
