import React, { Component } from 'react';
import './App.css';
import Home from './layout';
import store from './store';
import {Provider} from 'react-redux';
// import {ConnectedRouter} from 'react-router-redux';
import {createHashHistory, History} from 'history';
import { ConnectedRouter } from 'connected-react-router';

const history: History = createHashHistory();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <ConnectedRouter history={history}>
          <Home/>
      </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
