/*
 * @Date: 2019-07-25 17:53:01
 * @LastEditors: RichLee
 * @LastEditTime: 2019-08-19 09:53:30
 */
import React from 'react';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Reducer as counterReducer } from './components/counter/handle';
import thunkMiddleware from 'redux-thunk';
export interface Actions {
  type: string;
  payload?: Record<string, any>;
}

export const Context = React.createContext({});

const middlewares = [thunkMiddleware];

const reducers = combineReducers({
  count: counterReducer,
});

export const Store = createStore(
  reducers,
  compose(applyMiddleware(...middlewares))
);
