import React from 'react';
import SubRouter from '../utils/sub-router';
import Popup from './components/popup';

type IProps = {};

type IState = {};

const workPath = [
  {
    path: '/popup',
    name: '全局弹窗',
    component: Popup,
  },
].map(o => {
  o.path = '/comp-space' + o.path;
  return o;
});
export default function(props: IProps) {
  return <SubRouter group={workPath} pathUrl="comp-space"></SubRouter>;
}
