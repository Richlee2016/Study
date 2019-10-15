import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import HooksSpace from './components/hooks-space';
import StoreSpace from './components/store-space';
import WorkSpace from './components/work-space';
import AntdSpace from './components/antd-space';
import BaseSpace from './components/base-space';
import CompSpace from './components/comp-space';
import VrSpace from './components/vr-space';
import EditorSpace from './components/editor-space';
import { createHashHistory } from 'history';
import { Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import 'antd/dist/antd.css';
const history = createHashHistory();

type routeType = {
  path: string;
  name: string;
  component: React.ComponentClass | React.FunctionComponent;
};

const Routes: routeType[] = [
  {
    path: '/base-space',
    name: 'react基础',
    component: BaseSpace,
  },
  {
    path: '/hooks-space',
    name: 'hooks',
    component: HooksSpace,
  },
  {
    path: '/antd-space',
    name: 'antd组件',
    component: AntdSpace,
  },
  {
    path: '/comp-space',
    name: '常用组件',
    component: CompSpace,
  },
  {
    path: '/work-space',
    name: '工作空间',
    component: WorkSpace,
  },
  {
    path: '/store-space',
    name: '数据管理',
    component: StoreSpace,
  },
  {
    path: '/vr-space',
    name: '三维图形与VR',
    component: VrSpace,
  },
  {
    path: '/editor-space',
    name: '编辑器',
    component: EditorSpace,
  },
];

const mapRoutes = Routes.map(r => (
  <Route key={r.path} path={r.path} component={r.component} />
));

const mapLink = Routes.map(r => (
  <div key={r.path}>
    <Link to={r.path}>
      {r.path}({r.name})
    </Link>
  </div>
));

ReactDom.render(
  <Router history={history}>
    <Switch>
      <Route path="/" exact render={() => <App>{mapLink}</App>} />
      {mapRoutes}
      <Redirect to="/" />
    </Switch>
  </Router>,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
