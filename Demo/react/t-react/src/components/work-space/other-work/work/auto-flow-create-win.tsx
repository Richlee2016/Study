import React from 'react';
import { Form, DatePicker, Checkbox, Radio, Input, Select, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
const { RangePicker } = DatePicker;
const { Option } = Select;
type IProps = {};

type IState = {};
interface FormProps extends FormComponentProps, IProps {}
class App extends React.Component<FormProps, IState> {
  onHandleSubmit = () => {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        console.log(value);
      }
    });
  };
  render() {
    const { form } = this.props;
    return (
      <div>
        <Form>
          <Form.Item>
            {form.getFieldDecorator('rangTime', {})(
              <RangePicker allowClear={false}></RangePicker>
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('forever')(<Checkbox>永久有效</Checkbox>)}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('limitTime')(
              <Radio.Group>
                <Radio value={1}>限制总次数</Radio>
                <Radio value={2}>限制周期次数</Radio>
                <Radio value={3}>不限次数</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item>
            <label>同一用户</label>
            <Form.Item>{form.getFieldDecorator('date')(<Input />)}</Form.Item>
            <Form.Item>
              {form.getFieldDecorator('dateType')(
                <Select defaultValue="lucy">
                  <Option value="jack">天</Option>
                  <Option value="lucy">时</Option>
                  <Option value="Yiminghe">分</Option>
                </Select>
              )}
            </Form.Item>
            <label>可进入</label>
            <Form.Item>{form.getFieldDecorator('times')(<Input />)}</Form.Item>
            <label>次</label>
          </Form.Item>
          <Button onClick={this.onHandleSubmit}>提交</Button>
        </Form>
      </div>
    );
  }
}

export default Form.create<FormProps>()(App);
