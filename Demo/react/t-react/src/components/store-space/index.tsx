import React from 'react';
import PageHooks from './components/page-hooks';
import PageRedux from './components/page-redux';
import EventBug from './components/eventbus';
import SubRouter from '../utils/sub-router';

type IProps = {};

type IState = {};

const workPath = [
  {
    path: '/page-hooks',
    name: '单页构建render hooks',
    component: PageHooks,
  },
  {
    path: '/page-redux',
    name: '单页构建 redux',
    component: PageRedux,
  },
  {
    path: '/event-bug',
    name: '简单事件系统',
    component: EventBug,
  },
].map(o => {
  o.path = '/store-space' + o.path;
  return o;
});
export default function(props: IProps) {
  return <SubRouter group={workPath} pathUrl="store-space"></SubRouter>;
}
