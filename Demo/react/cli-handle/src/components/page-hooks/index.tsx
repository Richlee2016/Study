import React from 'react';
import Store from './store';
import { Context } from './store';
import Counter from './components/counter/counter';
interface IProps {}

export default function PageHooks(props: IProps) {
  const { state, dispatch } = Store();
  return (
    <Context.Provider value={{ state, dispatch }}>
      <div>
        <div>555</div>
        <Counter />
      </div>
    </Context.Provider>
  );
}
