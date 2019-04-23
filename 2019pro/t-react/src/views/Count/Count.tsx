import * as React from 'react';
import {State} from './model/reducer';
type Props = {
    count: State;
    add: (num: number) => void;
    min: () => void;
    asyncAdd: () => void;
};

const Counter: React.FC<Props> = props => {
  const { count: {num}, add, min, asyncAdd } = props;
  const addNum = (n: number) => add(n);
  const minNum = () => min();
  return (
        <div>
            <button onClick={minNum}>-</button>
            <span>{num}</span>
            <button onClick={() => {addNum(2); }}>+</button>
            <button onClick={asyncAdd}>asyncAdd</button>
        </div>
    );
};

export default Counter;
