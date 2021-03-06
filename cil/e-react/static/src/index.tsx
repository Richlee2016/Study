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
import { createHashHistory } from 'history';
import { Router, Switch, Route, Redirect, Link } from 'react-router-dom';

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
