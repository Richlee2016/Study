import React from 'react';

type AFrameType = 'scene' | 'box' | 'sphere' | 'cylinder' | 'plane' | 'sky';
interface AFrameStyle {
  width: string;
  height: string;
  position: string;
  rotation: string;
  color: string;
  radius: string;
}
type IProps = {
  type: AFrameType;
  styles?: Partial<AFrameStyle>;
};

type IState = {};

export default class Cmp extends React.Component<IProps, IState> {
  render() {
    const { type, children, styles } = this.props;
    return React.createElement('a-' + type, styles, children);
  }
}
