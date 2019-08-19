import React from 'react';
import { Context } from '../form';

interface WrapperProps {
  [IProps: string]: any;
}

export default function connectContext(
  WrappedComponent: React.ComponentType<any>
) {
  return class WrapperComponent extends React.Component<
    WrapperProps,
    Record<string, any>
  > {
    render() {
      return (
        <Context.Consumer>
          {value => {
            return <WrappedComponent innerProp={this.props} {...value} />;
          }}
        </Context.Consumer>
      );
    }
  };
}
