import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import TestContext from './components/context';
import Fragment from './components/fragments';
import RefsBody from './components/refs';
import LifeCircle from './components/life-circle';
import MyHooks from './components/hooks';
import AntdTable from './components/antd/table';
import AntdForm from './components/antd/form';
import PageHooks from './components/page-hooks';
import PageRedux from './components/page-redux';
import EventBug from './components/eventbus';
import WorkSpace from './components/work-space';
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
  {
    path: '/hooks',
    name: 'hooks演示',
    component: MyHooks,
  },
  {
    path: '/antd-table',
    name: 'antd表格',
    component: AntdTable,
  },
  {
    path: '/antd-form',
    name: 'antd表单',
    component: AntdForm,
  },
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
  {
    path: '/work-space',
    name: '工作空间',
    component: WorkSpace,
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
