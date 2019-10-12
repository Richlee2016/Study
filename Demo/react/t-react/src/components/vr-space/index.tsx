import React from 'react';
import AFrame from './components/aframe';
import SubRouter from '../utils/sub-router';

type IProps = {};

type IState = {};

const workPath = [
  {
    path: '/a-frame',
    name: 'webVR a-frame框架',
    component: AFrame,
  },
].map(o => {
  o.path = '/vr-space' + o.path;
  return o;
});
export default function(props: IProps) {
  return <SubRouter group={workPath} pathUrl="vr-space"></SubRouter>;
}
