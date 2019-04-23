import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import Counter from '../views/Count/model';
import Todo from '../views/Todo/Todo';
export default class Router extends React.Component {
    render() {
        return(
            <Switch>
                <Route path="/" exact={true} render={() =>  <Counter />} />
                <Route path="/todo"  render={() =>  <Todo one={21} />} />
            </Switch>
        );
    }
}
