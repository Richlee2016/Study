import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import routerConf from './config';
import {connect} from 'react-redux';
import Types from 'MyTypes';
import {replace} from 'connected-react-router';

class Router extends React.Component {
    render() {
        console.log(this.props);
        const mapRouter = routerConf.map(r =>  <Route key={r.path} path={r.path} exact={!!r.exact} render={() => <r.render />}/>);
        return(
            <Switch>
                {mapRouter}
            </Switch>
        );
    }
}

export default connect(
    (state: Types.RootState) => ({
        Router: state.router,
    }),
    {
        replace,
    }
)(Router);
