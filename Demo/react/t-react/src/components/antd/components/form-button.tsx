import * as React from 'react';
import { Input, Form, Button } from 'antd';
import ContextConnect from '../utils/context';
import { formItemLayout } from '../config';
import { FormState } from '../types';
import { FormComponentProps } from 'antd/lib/form';
import { makeName } from '../utils/utils';
interface IProps {
  Store?: FormState;
  form: FormComponentProps['form'];
}

interface IState {}

class FormButton extends React.Component<IProps, IState> {
  public state: IState = {};

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <>
        <Form.Item label="传入form" {...formItemLayout}>
          {getFieldDecorator('nice', {})(<Input />)}
        </Form.Item>
        <Button
          onClick={() => {
            this.props.form.setFieldsValue({
              [makeName('yes', 2)]: '跨组件操作form',
            });
          }}>
          这是跨组件操作form
        </Button>
      </>
    );
  }
}

export default ContextConnect(FormButton);
