import React from 'react';
import { Route, Link } from 'react-router-dom';
import Drag from './drag';
type IProps = {};

type IState = {};

export default class WorkSpace extends React.Component<IProps, IState> {
  public workPath = [
    {
      path: '/work-space/drag',
      name: 'H5拖拽',
      components: Drag,
    },
  ];
  render() {
    const linkMap = this.workPath.map(o => (
      <Link key={o.path} to={o.path}>
        {o.name}
      </Link>
    ));
    const workMap = this.workPath.map(o => (
      <Route key={o.path} path={o.path} exact render={() => <o.components />} />
    ));
    return (
      <div>
        {window.location.hash === '#/work-space' && <div>{linkMap}</div>}
        {workMap}
      </div>
    );
  }
}
