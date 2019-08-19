/*
 * @Date: 2019-07-25 18:04:42
 * @LastEditors: RichLee
 * @LastEditTime: 2019-08-19 10:32:58
 */
import { Dispatch } from 'redux';
export interface ActionsLoad {
  type: string;
  payload?: any;
}

export const ActionTypes = {
  ADD: 'ADD', //添加
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

export function Reducer(state: IState = initState, action: ActionsLoad) {
  switch (action.type) {
    case ActionTypes.ADD:
      return { ...state, num: state.num + 1 };
    default:
      return state;
  }
}

const _delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

export const mutations = {
  add: () => ({ type: ActionTypes.ADD }),
};

export const acions = {
  addAsync: () => async (dispatch: Dispatch<ActionsLoad>) => {
    await _delay(1000);
    dispatch(mutations.add());
  },
};

export const counterActions = {
  ...mutations,
  ...acions,
};
