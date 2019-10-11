import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import './form-wrapper.less';

export interface IProps<T> {
  value?: T;
  onChange?: (data: IProps<T>['value']) => void;
}

interface IState<T> {
  value: T;
}

interface FormProps<T> extends Partial<FormComponentProps>, IProps<T> {}

/**
 * @template T 传入组件props类型
 * @template K form表单值类型
 * @param {K} defaultValue 默认form表单值
 * @returns 具有antd from decorator 钩子的组件
 */
function FormDecoratorWrapper<T, K>(defaultValue: K) {
  return function(InnerWrapper: React.ComponentType<any>) {
    class FormDecorator extends React.Component<FormProps<K> & T, IState<K>> {
      static getDerivedStateFromProps(nextProps: FormProps<K> & T) {
        if ('value' in nextProps) {
          return {
            ...(nextProps.value || {}),
          };
        }
        return null;
      }

      constructor(props: FormProps<K> & T) {
        super(props);
        this.state = {
          value: props.value || defaultValue,
        };
      }

      triggerChange = (changedValue: IProps<K>['value']) => {
        const { onChange } = this.props;
        if (onChange) {
          onChange(Object.assign({}, this.state, changedValue));
        }
      };

      render() {
        const { value } = this.props;
        return (
          <InnerWrapper
            {...this.props}
            data={value || defaultValue}
            triggerChange={this.triggerChange}
          />
        );
      }
    }
    return FormDecorator;
  };
}

export default FormDecoratorWrapper;
