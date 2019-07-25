import React from 'react';
import { combineReducers, createStore } from 'redux';

export interface Actions {
  type: string;
  payload?: Record<string, any>;
}

export const Context = React.createContext({});

const counterReducer = (state: any = { num: 1 }, actions: any) => {
  switch (actions.type) {
    case 'ADD':
      return { ...state, num: state.num + 1 };
      break;
    default:
      return state;
  }
};

const reducers = combineReducers({
  count: counterReducer,
});

export const Store = createStore(reducers);
