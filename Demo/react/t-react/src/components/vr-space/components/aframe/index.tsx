import React from 'react';
import Frame from './components/cmp';
import 'aframe';
import './index.less';
type IProps = {};

type IState = {};

export default class App extends React.Component<IProps, IState> {
  render() {
    return (
      <div>
        <h3>webVR Aframe</h3>
        <div>
          <Frame type="scene">
            <Frame
              type="box"
              styles={{
                position: '-1 0.5 -3',
                rotation: '0 45 0',
                color: '#4CC3D9',
              }}></Frame>
            <Frame
              type="sphere"
              styles={{
                position: '0 1.25 -5',
                radius: '1.25',
                color: '#EF2D5E',
              }}></Frame>
            <Frame
              type="cylinder"
              styles={{
                position: '1 0.75 -3',
                radius: '0.5',
                height: '1.5',
                color: '#FFC65D',
              }}></Frame>
            <Frame
              type="plane"
              styles={{
                position: '0 0 -4',
                rotation: '-90 0 0',
                width: '4',
                height: '4',
                color: '#7BC8A4',
              }}></Frame>
            <Frame type="sky" styles={{ color: '#ECECEC' }}></Frame>
          </Frame>
        </div>
      </div>
    );
  }
}
