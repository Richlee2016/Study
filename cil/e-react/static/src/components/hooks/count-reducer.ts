import { useReducer } from 'react';

type StateType = {
  count: number;
};

type Actions = {
  type: string;
  payload?: Record<string, any>;
};

const initState = { count: 0 };

function reducer(state: StateType, action: Actions) {
  switch (action.type) {
    case 'add':
      return { count: state.count + 1 };
    case 'minus':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export const CountStore = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  return {
    count: state.count,
    add: () => dispatch({ type: 'add' }),
    minus: () => dispatch({ type: 'minus' }),
  };
};
