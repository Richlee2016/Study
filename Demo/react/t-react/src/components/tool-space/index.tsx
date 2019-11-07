import React from 'react';
import SubRouter from '../utils/sub-router';
import Immutable from './components/immutable'
type IProps = {};

type IState = {};

const workPath = [
  {
    path: '/immutable',
    name: 'immutable库',
    component: Immutable,
  }
].map(o => {
  o.path = '/tool-space' + o.path;
  return o;
});
export default function(props: IProps) {
  return <SubRouter group={workPath} pathUrl="tool-space"></SubRouter>;
}
