import React from 'react';
import { createCount } from './count-hook';
import { CountStore } from './count-reducer';
type IProps = {};

const MyHooks: React.SFC<IProps> = () => {
  const { count, add, minus, mount, letMount, name, addName } = createCount();
  mount();
  letMount();
  return (
    <div>
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

const OneHooks: React.SFC<IProps> = () => {
  const { count, add, minus } = CountStore();
  return (
    <div>
      <div>
        <span>{count}</span>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    </div>
  );
};

const TwoHooks: React.SFC<IProps> = () => {
  const { count, add, minus } = CountStore();
  return (
    <div>
      <div>
        <span>{count}</span>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    </div>
  );
};

export default class TestHooks extends React.Component {
  render() {
    return (
      <div>
        <MyHooks />
        <div>
          <OneHooks />
        </div>
        <div>
          <TwoHooks />
        </div>
      </div>
    );
  }
}
