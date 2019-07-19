import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import './zstyle.less';
interface IProps extends FormComponentProps {}

function MyForm(props: IProps) {
  const {
    form: { getFieldDecorator },
  } = props;
  return (
    <div className="my-form">
      <Form>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请选择模板',
              },
            ],
            initialValue: 'nice',
          })}
        </Form.Item>
      </Form>
    </div>
  );
}

export default Form.create<IProps>()(MyForm);
