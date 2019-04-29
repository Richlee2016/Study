import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import * as types from './types';

export type Action = ActionType<typeof actions>;

export type State = {
  Group: any[];
};

const initState: State = {
  Group: [],
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case types.ADD_GROUP:
      return { ...state, Group: action.payload };
      break;
    default:
      return state;
      break;
  }
};
