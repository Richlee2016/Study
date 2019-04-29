import * as React from 'react';
import { State } from './model/reducer';
import { Button } from 'antd';
type Props = {
    count: State;
    add: (num: number) => void;
    min: () => void;
    asyncAdd: () => void;
    // Router: any;
};

const Counter: React.FC<Props> = props => {
    const { count: { num }, add, min, asyncAdd } = props;
    // console.log(Router
    const addNum = (n: number) => add(n);
    const minNum = () => min();
    return (
        <div>
            <Button onClick={minNum} type="primary">-</Button>
            <span>{num}</span>
            <Button onClick={() => { addNum(2); }} type="primary">+</Button>
            <Button onClick={asyncAdd} type="dashed">asyncAdd</Button>
        </div>
    );
};

export default Counter;
