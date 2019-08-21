import React from 'react';
import MyHooks from './components/hooks';
import SubRouter from '../utils/sub-router';

type IProps = {};

type IState = {};

const workPath = [
  {
    path: '/hooks',
    name: 'hooks演示',
    component: MyHooks,
  },
].map(o => {
  o.path = '/hooks-space' + o.path;
  return o;
});
export default function(props: IProps) {
  return <SubRouter group={workPath} pathUrl="hooks-space"></SubRouter>;
}
