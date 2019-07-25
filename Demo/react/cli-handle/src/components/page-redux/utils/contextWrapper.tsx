import React from 'react';
import { Context, Actions } from '../store';

interface WrapperProps {
  [IProps: string]: any;
}

export default function connectContext(
  stateWrapper?: (state: Record<string, any>) => Record<string, any>,
  actionWrapper?: (
    dispatch: React.Dispatch<Actions>,
    state?: Record<string, any>
  ) => Record<string, any>
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
              console.log(value);
              let { state, dispatch } = value as Record<string, any>;
              const stateWrapperProps = stateWrapper && stateWrapper(state);
              const actionWrapperProps =
                actionWrapper && actionWrapper(dispatch, state);
              return (
                <WrappedComponent
                  innerProp={this.props}
                  {...stateWrapperProps}
                  {...actionWrapperProps}
                />
              );
            }}
          </Context.Consumer>
        );
      }
    };
  };
}
