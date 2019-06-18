import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
require('./text.css');
let targetWin: any = null;
if (window) targetWin = window;
new Proxy(targetWin, {
  get: function(target: any, key: any, receiver: any) {
    if (!targetWin) {
      return Reflect.get({ nothing: function() {} }, 'nothing', receiver);
    }
    return Reflect.get(target, key, receiver);
  },
});
type IProps = {};

type IState = {
  isShow: boolean;
};

const Frag = () => (
  <Fragment>
    {[1, 2, 3, 4].map(o => (
      <li key={o}>{o}</li>
    ))}
  </Fragment>
);

class Portal extends React.Component {
  public el: HTMLDivElement = document.createElement('div');
  componentWillMount() {
    document.body.appendChild(this.el);
  }
  componentWillUnmount() {
    document.body.removeChild(this.el);
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

class ErrorBoundary extends React.Component {
  state: { hasError: boolean; errorMsg: string } = {
    hasError: false,
    errorMsg: '',
  };
  componentDidCatch(err, info) {
    console.error(err);
    this.setState({
      hasError: true,
      errorMsg: info,
    });
  }
  render() {
    return this.state.hasError ? (
      <div>something worry</div>
    ) : (
      this.props.children
    );
  }
}

export default class Fragments extends React.Component<IProps, IState> {
  state: IState = {
    isShow: false,
  };
  handleMoadl() {
    this.setState({
      isShow: !this.state.isShow,
    });
  }
  render() {
    const { isShow } = this.state;
    return (
      <>
        <div className="box">321</div>
        <ul>
          <Frag />
        </ul>
        <button onClick={this.handleMoadl.bind(this)}>切换</button>
        {isShow ? (
          <Portal>
            <div>这是Portal的test</div>
          </Portal>
        ) : null}
        <div>
          <h4>error boundaries</h4>
          <ErrorBoundary>
            <p>if have something wrong</p>
          </ErrorBoundary>
        </div>
      </>
    );
  }
}
