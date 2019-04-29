import Types from 'MyTypes';
import { connect } from 'react-redux';
import * as A from './actions';
import Counter from '../Count';

const CounterConnect = connect(
  (state: Types.RootState) => ({
    count: state.count,
    Router: state.router,
  }),
  {
    add: A.add,
    min: A.min,
    asyncAdd: A.asyncAdd,
  }
)(Counter);

export default CounterConnect;
