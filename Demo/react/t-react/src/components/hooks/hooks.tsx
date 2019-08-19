import React, { useState, useEffect, useRef } from 'react';
// import { createCount } from './count-hook';
// import { CountStore } from './count-reducer';
type IProps = {};

const MyHooks: React.SFC<IProps> = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const createCount = {
    addName: () => setName(name + 1),
    add: () => setCount(count + 1),
    minus: () => setCount(count - 1),
  };
  const { add, minus, addName } = createCount;
  useEffect(() => {
    console.log('mount', 'update');
    setCount(321);
    return () => {
      console.log('unMount');
    };
  }, [count]);
  useEffect(() => {
    console.log('第二次嗲用 effect');
  }, [name]);
  return (
    <div>
      <h3>useEffect 生命周期</h3>
      <div>
        <span>{count}</span>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
      <div>
        <p>{name}</p>
        <button onClick={addName}>addname</button>
      </div>
    </div>
  );
};

const TwoHooks: React.SFC<IProps> = () => {
  // const { count, add, minus } = CountStore();
  return (
    <div>
      <h3>这里是useReducer</h3>
      {/* <div>
        <span>{count}</span>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div> */}
    </div>
  );
};

const useShareNum = (num: number, onChange: () => void) => {
  const [count, setCount] = useState('这是最开始的');
  useEffect(() => {
    if (num === 5 || num === 1005) {
      setCount('数字达到了===》' + num);
      // onChange();
    }
  }, [num]);
  return count;
};

const ShareHook: React.SFC<{ box: number; onChange: () => void }> = props => {
  const [num, setNum] = useState(1);
  const count = useShareNum(props.box, props.onChange);

  return (
    <>
      <h3>共享 与 父子监听传值</h3>
      <span>{num}</span>
      <button
        onClick={() => {
          setNum(num + 1);
        }}>
        +++
      </button>
      <p>{count}</p>
    </>
  );
};

const RefHook: React.SFC<{}> = props => {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    // (inputEl as any).current.focus();
    console.log((inputEl as any).current.value);
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
};

export default function TestHooks() {
  const [num, setNum] = useState(1);
  const onChange = () => {
    setNum(1000);
  };
  return (
    <div>
      <div>
        <MyHooks />
      </div>
      <div>
        <TwoHooks />
      </div>
      <div>
        <ShareHook box={num} onChange={onChange}></ShareHook>
        <button
          onClick={() => {
            setNum(num + 1);
          }}>
          更改share prop
        </button>
        <p>box===>{num}</p>
      </div>
      <div>
        <h3>Refhook</h3>
        <RefHook />
      </div>
    </div>
  );
}
