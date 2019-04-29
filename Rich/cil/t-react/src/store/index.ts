import * as redux from 'redux';
import reduxLogger from 'redux-logger';
import reduxChunk from 'redux-thunk';
import rootReducer from './reducers';
import { createHashHistory } from 'history';
import {routerMiddleware } from 'connected-react-router';
const history = createHashHistory();
const midArr = [reduxChunk, reduxLogger];
const mids = redux.applyMiddleware(routerMiddleware(history), ...midArr);

const initialState = {};

export default redux.createStore(rootReducer, initialState, redux.compose(mids));
