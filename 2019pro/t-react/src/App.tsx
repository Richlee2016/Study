import React, { Component } from 'react';
import './App.css';
import Home from './routes';
import {HashRouter} from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux';
// import {Provider} from 'react-redux'
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Provider store={store}>
          <Home/>
        </Provider>
      </HashRouter>
    );
  }
}

export default App;
