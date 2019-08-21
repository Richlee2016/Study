import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';

interface RouterGroup {
  path: string;
  name: string;
  component: any;
}

interface IProps {
  group: RouterGroup[];
  pathUrl: string;
}

class SubRouter extends React.Component<IProps, {}> {
  render() {
    const { group, pathUrl } = this.props;
    const linkMap = group.map(o => (
      <div key={o.path}>
        <Link to={o.path}>{o.name}</Link>
      </div>
    ));
    const workMap = group.map(o => (
      <Route key={o.path} path={o.path} exact render={() => <o.component />} />
    ));
    return (
      <Fragment>
        {window.location.hash === `#/${pathUrl}` && <div>{linkMap}</div>}
        {workMap}
      </Fragment>
    );
  }
}

export default SubRouter;
