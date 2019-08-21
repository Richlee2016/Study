import React from 'react';
import AntdTable from './antd/table';
import AntdForm from './antd/form';
import SubRouter from '../utils/sub-router';

type IProps = {};

type IState = {};

const workPath = [
  {
    path: '/antd-space/table',
    name: '表格',
    component: AntdTable,
  },
  {
    path: '/antd-space/form',
    name: '表单',
    component: AntdForm,
  },
];
export default function(props: IProps) {
  return <SubRouter group={workPath} pathUrl="antd-space"></SubRouter>;
}
