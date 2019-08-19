import React from 'react';
import { Button } from 'antd';
import ContextWrapper from '../../utils/contextWrapper';
import { counterActions, IState } from './handle';
import { actionsMap } from '../../utils/utils';
type ActionsType = typeof counterActions;

interface IProps extends ActionsType {
  count: IState;
}

class Counter extends React.Component<IProps> {
  render() {
    const { add, count, addAsync } = this.props;
    const { num } = count;
    return (
      <div>
        <Button type="primary" onClick={add}>
          +
        </Button>
        <span>{num}</span>
        <Button type="primary" onClick={addAsync}>
          async +
        </Button>
      </div>
    );
  }
}

export default ContextWrapper(
  state => ({
    count: state.count,
  }),
  {
    ...actionsMap<ActionsType>(counterActions, ['add', 'addAsync']),
  }
)(Counter);
