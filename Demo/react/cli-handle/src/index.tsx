import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import TestContext from './components/context';
import Fragment from './components/fragments';
import RefsBody from './components/refs';
import LifeCircle from './components/life-circle';
import WorkVipList from './components/work-space/vip-list';
import CardComp from './components/work-space/card-comp';
import MyHooks from './components/hooks';
import AntdTable from './components/antd/table';
import AntdForm from './components/antd/form';
import PageHooks from './components/page-hooks';
import PageRedux from './components/page-redux';
import EventBug from './components/eventbus';
import { createHashHistory } from 'history';
import { Router, Switch, Route, Redirect, Link } from 'react-router-dom';
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
    path: '/work-vip-list',
    name: '付费会员官网',
    component: WorkVipList,
  },
  {
    path: '/work-card-comp',
    name: '擦片组件',
    component: CardComp,
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
  document.querySelector('#app')
);
