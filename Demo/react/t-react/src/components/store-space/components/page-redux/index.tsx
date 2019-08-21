import React from 'react';
import { Store, Context } from './store';
import Counter from './components/counter/counter';
interface IProps {}

interface IState {}

class PageRedux extends React.Component<IProps, IState> {
  public unSubscribe: any;

  public state: IState = Store.getState();

  componentDidMount() {
    const { getState, subscribe } = Store;
    this.unSubscribe = subscribe(() => {
      this.setState(getState());
    });
  }

  componentWillUnmount() {
    this.unSubscribe();
  }

  render() {
    return (
      <Context.Provider value={{ state: this.state, dispatch: Store.dispatch }}>
        <div>
          <div>555</div>
          <Counter title="nice" />
        </div>
      </Context.Provider>
    );
  }
}

export default PageRedux;
