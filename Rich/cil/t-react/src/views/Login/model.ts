import Types from 'MyTypes';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Login from './Login';
import { action, ActionType } from 'typesafe-actions';
import { Timer } from '../../assets/utils';
const LOGIN = 'Log/IN';
const LOGOUT = 'Log/OUT';

type User = { name: string } | null;

type State = {
  Token?: string | null;
  User?: User | null;
};

const actions = {
  login: (user: State) => action(LOGIN, user),
  logout: () => action(LOGOUT),
};

const thunk = {
  fetchToken: async () => async (dispatch: Dispatch) => {
    await Timer(300);
    const Token = '123456';
    await Timer(300);
    const User = { name: 'rich' };
    dispatch(actions.login({ Token, User }));
  },
};

const initState = {
  Token: null,
  User: null,
};

export const reducer = (
  state: State = initState,
  action: ActionType<typeof actions>
) => {
  switch (action.type) {
    case LOGIN:
      const { User, Token } = action.payload;
      return { ...state, Token, User };
      break;
    case LOGOUT:
      return { ...state, Token: null, User: null };
      break;
    default:
      return state;
      break;
  }
};

const CounterConnect = connect(
  (state: Types.RootState) => ({}),
  {
    ...thunk,
  }
)(Login);

export default CounterConnect;
