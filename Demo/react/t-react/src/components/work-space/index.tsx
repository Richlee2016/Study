import React from 'react';
import Drag from './drag';
import BaseDrag from './base-drag';
import SubRouter from '../utils/sub-router';
import RichEditor from './rich-editor';
import OtherWork from './other-work';
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
  {
    path: '/work-space/rich-editor',
    name: '自定义富文本',
    component: RichEditor,
  },
  {
    path: '/work-space/other-work',
    name: '业务',
    component: OtherWork,
  },
];

export default function(props: IProps) {
  return <SubRouter group={workPath} pathUrl="work-space"></SubRouter>;
}
