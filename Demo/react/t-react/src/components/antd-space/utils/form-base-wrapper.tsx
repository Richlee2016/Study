import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form } from 'antd';
import './dialog.less';

export interface IProps {
  className?: string;
}

interface IState {
  title?: string;
}

interface FormProps extends FormComponentProps, IProps {}
// 弹窗高阶组件
function DialogWin<T>(InnerWrapper: React.ComponentType<T>) {
  class DialogPure extends React.Component<FormProps & T, IState> {
    public temTitle: string = '';

    constructor(props: FormProps & T) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      const title = this.props.form.getFieldValue('title');
      console.log('获取title');
      console.log(title);
      this.setState({ title });
    }

    getTitle = (title: string) => {
      this.setState({ title });
    };

    render() {
      const { className, form } = this.props;
      const { title } = this.state;
      return <InnerWrapper {...this.props} headTitle={this.state.title} />;
    }
  }
  return Form.create<FormProps & T>()(DialogPure);
}

export default DialogWin;
