import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Link, Switch } from './react-router'
import One from './components/one'
import Two from './components/two'
import Three from './components/three'
class Page extends React.Component {
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route path='/' exact component={One} />
          <Route path='/movie' component={Two} />
          <Route path='/good/:id' component={Three} />
        </Switch>
        <Link to='/'>go home</Link>
        <Link to='/movie'>go movie</Link><br />
        <Link to='/good/1'>/good/1</Link><br />
        <Link to='/good/2'>/good/2</Link><br />
        <Link to='/good/4'>/good/4</Link><br />
        <Link to='/movie/add'>/movie/add</Link>
      </HashRouter>
    )
  };
}
ReactDOM.render(<Page />, document.querySelector('#app'))
