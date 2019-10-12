import React from 'react';
import Three from 'three';
type IProps = {};

type IState = {};

export default class App extends React.Component<IProps, IState> {
  componentDidMount() {}

  init() {
    const camera = new Three.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight
    );
    camera.position.z = 1;

    const scene = new Three.Scene();
    const geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
  }

  render() {
    return <div>three</div>;
  }
}
