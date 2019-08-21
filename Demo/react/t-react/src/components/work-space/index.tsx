import React from 'react';
import Drag from './drag';
import BaseDrag from './base-drag';
import SubRouter from '../utils/sub-router';
type IProps = {};

type IState = {};

const workPath = [
  {
    path: '/work-space/drag',
    name: 'H5拖拽',
    component: Drag,
  },
  {
    path: '/work-space/base-drag',
    name: '原生拖拽',
    component: BaseDrag,
  },
];

export default function(props: IProps) {
  return <SubRouter group={workPath} pathUrl="work-space"></SubRouter>;
}
