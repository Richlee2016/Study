import * as React from 'react';
import { Form, Checkbox } from 'antd';
import ContextConnect from '../utils/context';
import { formItemLayout } from '../config';
import { FormState } from '../types';
import { FormComponentProps } from 'antd/lib/form';
const CheckboxGroup = Checkbox.Group;
interface IProps {
  Store?: FormState;
  form: FormComponentProps['form'];
}

const options = [
  { label: 'All', value: 'All' },
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

interface IState {}

class FormPropData extends React.Component<IProps, IState> {
  public state: IState = {};
  private selectOptions = options;

  normalizeAll = (value: any = [], prevValue: any = []) => {
    const group = this.selectOptions.map(o => o.value);
    const len = group.length;
    // 全选
    if (value.includes('All') && !prevValue.includes('All')) {
      return group;
    }
    // 全撤销
    if (!value.includes('All') && prevValue.includes('All')) {
      return [];
    }
    // 子全选
    if (
      !value.includes('All') &&
      value.length === len - 1 &&
      prevValue.length === len - 2
    ) {
      return group;
    }
    // 子撤销
    if (
      value.includes('All') &&
      value.length === len - 1 &&
      prevValue.length === len
    ) {
      value.shift();
      return value;
    }

    return value;
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <>
        <Form.Item label="全选与反选" {...formItemLayout}>
          {getFieldDecorator('fruits', {
            normalize: this.normalizeAll,
          })(<CheckboxGroup options={this.selectOptions} />)}
        </Form.Item>
      </>
    );
  }
}

export default ContextConnect(FormPropData);
