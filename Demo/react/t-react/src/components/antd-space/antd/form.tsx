import React from 'react';
import { Form, Button } from 'antd';
import { FormState } from '../types';
// import { formItemLayout } from './config';
import { FormComponentProps } from 'antd/lib/form';
import FormPropData from '../components/form-prop';
import FormButton from '../components/form-button';
import FormSelectAll from '../components/form-select-all';
import { makeName, groupDistribut } from '../utils/utils';
import '../zstyle.less';

export interface FormProps extends FormComponentProps {}

// 创建表单  上下文
export const Context = React.createContext({ Store: {}, form: {} });

interface LoopForm {
  radio: string;
  yes: string;
}

class MyForm extends React.Component<FormProps, FormState> {
  public state: FormState = {};
  render() {
    return (
      <Context.Provider value={{ Store: this.state, form: this.props.form }}>
        <Form>
          <FormPropData />
          <FormSelectAll />
          <Button
            onClick={() => {
              this.props.form.setFieldsValue({
                box: 555,
              });
            }}>
            Add
          </Button>
          <Button
            onClick={() => {
              this.props.form.validateFields((err, value) => {
                if (!err) {
                  console.log(value);
                  const group = groupDistribut<LoopForm>(value, [
                    'radio',
                    'yes',
                  ]);
                  console.log(group);
                }
              });
            }}>
            添加内容
          </Button>
          <Button
            onClick={() => {
              this.props.form.setFieldsValue({
                [makeName('yes', 1)]: '这个是在主表单对表单内部表单组件的赋值',
              });
            }}>
            操作组件内部的form
          </Button>
          <FormButton />
        </Form>
      </Context.Provider>
    );
  }
}

export default Form.create<FormProps>()(MyForm);
