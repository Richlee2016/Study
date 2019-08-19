import React from 'react';
import { Context } from '../form';

interface WrapperProps {
  value?: Record<string, any>;
  onChange?: Function;
  [IProps: string]: any;
}

export default function connectContext(
  WrappedComponent: React.ComponentType<Record<string, any>>
) {
  return class WrapperComponent extends React.Component<
    WrapperProps,
    Record<string, any>
  > {
    static getDerivedStateFromProps(nextProps: WrapperProps) {
      if ('value' in nextProps) {
        return {
          ...(nextProps.value || {}),
        };
      }
      return null;
    }

    static static = {
      value: {},
    };

    constructor(props: WrapperProps) {
      super(props);
      this.state = props.value || {};
    }

    triggerChange = (changedValue: Record<string, any>) => {
      const { onChange } = this.props;
      if (onChange) {
        onChange(Object.assign({}, this.state, changedValue));
      }
    };

    render() {
      return (
        <Context.Consumer>
          {value => {
            return (
              <WrappedComponent
                value={this.props.value || {}}
                innerProp={this.props}
                onChange={this.triggerChange}
                {...value}
              />
            );
          }}
        </Context.Consumer>
      );
    }
  };
}
