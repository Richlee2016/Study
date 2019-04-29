import Types from 'MyTypes';
import { connect } from 'react-redux';
import * as A from './actions';
import Group from '../Group';

const CounterConnect = connect(
  (state: Types.RootState) => ({
    Group: state.group.Group,
    Router: state.router,
  }),
  {
    fetchGroup: A.fetchGroup,
  }
)(Group);

export default CounterConnect;
