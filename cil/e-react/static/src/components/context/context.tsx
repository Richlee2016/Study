import React from 'react';
import Father from './father';

export const Context = React.createContext('default');

type IProps = {};
type IState = {};

export default class TextContext extends React.Component<IProps, IState> {
  render() {
    return (
      <Context.Provider value={JSON.stringify({ box: 1 })}>
        <Father />
      </Context.Provider>
    );
  }
}
