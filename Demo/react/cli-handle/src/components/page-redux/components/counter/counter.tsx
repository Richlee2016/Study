import React from 'react';
// import { Button } from 'antd';
import ContextWrapper from '../../utils/contextWrapper';
import { Actions, IState } from './handle';

interface IProps extends ReturnType<typeof Actions> {
  count: IState;
}

class Counter extends React.Component<IProps> {
  render() {
    console.log(this.props);
    return (
      <div>
        <h3></h3>
        {/* <Button type="primary" onClick={add}>
          +
        </Button>
        <span>{num}</span>
        <Button type="primary" onClick={minus}>
          -
        </Button>
        <Button type="primary" onClick={addAsync}>
          async +
        </Button>
        <Button type="primary" onClick={props.minusAddAsync}>
          async + -
        </Button>
        <Button type="primary" onClick={() => props.addName()}>
          add name
        </Button> */}
      </div>
    );
  }
}

export default ContextWrapper()(Counter);
// state => ({
//   count: state.count,
// }),
// dispatch => Actions(dispatch)
