import React from 'react';
import { Context } from '../store';
import { bindActionCreators } from 'redux';
interface WrapperProps {
  [IProps: string]: any;
}

export default function connectContext(
  mapStateToProps?: (state: Record<string, any>) => Record<string, any>,
  mapDispatchToProps?: Record<string, any>
) {
  return function componentWrapper(WrappedComponent: React.ComponentType<any>) {
    return class WrapperComponent extends React.Component<
      WrapperProps,
      Record<string, any>
    > {
      render() {
        return (
          <Context.Consumer>
            {value => {
              let { state, dispatch } = value as Record<string, any>;
              const mystate = mapStateToProps && mapStateToProps(state);
              let actions: Record<string, any> = {};
              if (typeof mapDispatchToProps === 'function') {
                actions = mapDispatchToProps(dispatch);
              } else if (typeof mapDispatchToProps === 'object') {
                actions = bindActionCreators(mapDispatchToProps, dispatch);
              }
              return (
                <WrappedComponent
                  innerProp={this.props}
                  {...mystate}
                  {...actions}
                />
              );
            }}
          </Context.Consumer>
        );
      }
    };
  };
}
