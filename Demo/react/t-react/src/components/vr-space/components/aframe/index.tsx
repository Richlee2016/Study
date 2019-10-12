import React from 'react';
import ReactDom from 'react-dom';
import 'aframe';
import './index.less';
type IProps = {};

type IState = {};

const Frame: React.SFC<{ name: string }> = props =>
  React.createElement('a-' + props.name, { ...props }, props.children);

export default class App extends React.Component<IProps, IState> {
  container = React.createRef<any>();
  componentDidMount() {}
  render() {
    return (
      <div>
        <h3>webVR Aframe</h3>
        <div ref={this.container}>
          <Frame name="scene">
            {/* <Frame
              name="box"
              position="-1 0.5 -3"
              rotation="0 45 0"
              color="#4CC3D9"></Frame> */}
            {/* <Frame
              name="sphere"
              position="0 1.25 -5"
              radius="1.25"
              color="#EF2D5E"></Frame>
            <Frame
              name="cylinder"
              position="1 0.75 -3"
              radius="0.5"
              height="1.5"
              color="#FFC65D"></Frame>
            <Frame
              name="plane"
              position="0 0 -4"
              rotation="-90 0 0"
              width="4"
              height="4"
              color="#7BC8A4"></Frame>
            <Frame name="sky" color="#ECECEC"></Frame> */}
          </Frame>
        </div>
      </div>
    );
  }
}
