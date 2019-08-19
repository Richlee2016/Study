import React from 'react';
import { useReducer } from 'react';
import { Reducer as CounterReducer } from './components/counter/handle';
export const Context = React.createContext({});

export interface Actions {
  type: string;
  payload?: Record<string, any>;
}

function combineReducers(reducers: Record<string, any>) {
  return function(state: Record<string, any> = {}, action: Actions) {
    return Object.keys(reducers).reduce(
      (newStates: Record<string, any>, key) => {
        newStates[key] = reducers[key](state[key], action);
        return newStates;
      },
      {}
    );
  };
}

const reducers = combineReducers({ count: CounterReducer });

export default function() {
  const [state, dispatch] = useReducer(reducers, {});
  if (!Object.keys(state).length) {
    dispatch({ type: '@INIT' });
  }
  return {
    state,
    dispatch,
  };
}
