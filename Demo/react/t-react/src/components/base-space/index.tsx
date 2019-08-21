import React from 'react';
import TestContext from './components/context';
import Fragment from './components/fragments';
import RefsBody from './components/refs';
import LifeCircle from './components/life-circle';
import SubRouter from '../utils/sub-router';

type IProps = {};

type IState = {};

const workPath = [
  {
    path: '/context',
    name: '上下文context、组件懒加载lazy',
    component: TestContext,
  },
  {
    path: '/fragment',
    name: '片段、插槽、错误边界',
    component: Fragment,
  },
  {
    path: '/refs',
    name: 'ref',
    component: RefsBody,
  },
  {
    path: '/circle',
    name: '生命周期演示',
    component: LifeCircle,
  },
].map(o => {
  o.path = '/base-space' + o.path;
  return o;
});
export default function(props: IProps) {
  return <SubRouter group={workPath} pathUrl="base-space"></SubRouter>;
}
