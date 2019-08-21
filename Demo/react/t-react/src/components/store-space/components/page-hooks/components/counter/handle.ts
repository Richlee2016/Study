import React from 'react';

export interface Actions {
  type: string;
  payload?: any;
}

export const ActionTypes = {
  ADD: 'ADD', //添加
  MINUS: 'MINUS', //减少
  ADD_NAME: 'ADD_NAME',
  MINUS_NAME: 'MINUS_NAME',
};

export interface IState {
  num: number;
  title: string;
  total: number[];
}

const initState = {
  num: 0,
  title: '标题',
  total: [0, 0],
};

export function Reducer(state: IState = initState, action: Actions) {
  console.log(action);
  switch (action.type) {
    case ActionTypes.ADD:
      return { ...state, num: state.num + 1 };
    case ActionTypes.MINUS:
      return { ...state, num: state.num - 1 };
    case ActionTypes.ADD_NAME:
      state.total[0] = state.total[0] + 1;
      return {
        ...state,
        num: state.num + action.payload,
        title: `您增加了${state.total[0]}ci`,
        total: state.total,
      };
    default:
      return state;
  }
}

const _delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

export function Actions(dispatch: React.Dispatch<Actions>) {
  const mutations = {
    add: () => {
      console.log('添加');
      dispatch({ type: ActionTypes.ADD });
    },
    minus: () => {
      console.log('减少');
      dispatch({ type: ActionTypes.MINUS });
    },
    addName: (num?: number) => {
      dispatch({ type: ActionTypes.ADD_NAME, payload: num || 1 });
    },
  };

  const actions = {
    addAsync: async () => {
      console.log('异步添加');
      await _delay(600);
      mutations.add();
    },
    minusAddAsync: async () => {
      console.log('异步先加后减');
      await actions.addAsync();
      await _delay(600);
      mutations.minus();
    },
  };

  return {
    ...mutations,
    ...actions,
  };
}
