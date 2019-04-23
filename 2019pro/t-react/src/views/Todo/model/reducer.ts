import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ADD, MIN } from './types';

export type Action = ActionType<typeof actions>;

export type State = {
  num: number;
};

const initState: State = {
  num: 2,
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case ADD:
      return { ...state, num: state.num + action.payload };
      break;
    case MIN:
      return { ...state, num: state.num - 1 };
      break;
    default:
      return state;
      break;
  }
};
