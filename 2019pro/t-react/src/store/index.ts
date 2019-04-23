import * as redux from 'redux';
import reduxLogger from 'redux-logger';
import reduxChunk from 'redux-thunk';
import rootReducer from './reducers';

const midArr = [reduxChunk, reduxLogger];
const mids = redux.applyMiddleware(...midArr);

const initialState = {};

export default redux.createStore(rootReducer, initialState, mids);
