import React from 'react';
import Editor from './editor';
import SubRouter from '../utils/sub-router';
type IProps = {};

type IState = {};

const workPath = [
  {
    path: '/editor',
    name: 'editor编辑器',
    component: Editor,
  },
].map(o => {
  o.path = '/editor-space' + o.path;
  return o;
});
export default function(props: IProps) {
  return <SubRouter group={workPath} pathUrl="editor-space"></SubRouter>;
}
