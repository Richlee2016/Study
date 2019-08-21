import * as React from 'react';
import { Input, Form, Radio } from 'antd';
import ContextConnect from '../utils/context';
import { formItemLayout } from '../config';
import { FormState } from '../types';
import { FormComponentProps } from 'antd/lib/form';
import { RadioChangeEvent } from 'antd/lib/radio';
import { makeName } from '../utils/utils';
interface IProps {
  Store?: FormState;
  form: FormComponentProps['form'];
}

interface IState {}

class FormPropData extends React.Component<IProps, IState> {
  public state: IState = {};

  // radio 内置 Item
  radioFormItemRender = (name: number) => {
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const radio = getFieldValue(makeName('radio', name));
    return (
      <>
        {getFieldDecorator(makeName('yes', name), {
          rules: [{ required: radio === 2, message: '请输入值' }],
        })(<Input disabled={radio === 1} />)}
      </>
    );
  };

  radioHandleChange = (e: RadioChangeEvent, idx: number) => {
    const val = e.target.value;
    let name = makeName('yes', idx);
    if (val === 1) {
      this.props.form.setFieldsValue({ [name]: '' });
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <>
        <Form.Item label="传入form" {...formItemLayout}>
          {getFieldDecorator('box', {})(<Input />)}
        </Form.Item>
        {[1, 2, 3].map((o, idx) => (
          <Form.Item key={o} label="这是组合">
            {getFieldDecorator(makeName('radio', idx), {
              initialValue: 1,
            })(
              <Radio.Group
                onChange={e => this.radioHandleChange(e, idx)}
                options={[
                  { label: 321, value: 1 },
                  {
                    label: this.radioFormItemRender(idx),
                    value: 2,
                  },
                ]}
              />
            )}
          </Form.Item>
        ))}
      </>
    );
  }
}

export default ContextConnect(FormPropData);
