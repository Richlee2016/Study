import * as React from 'react';
import { Input } from 'antd';
import ContextConnect from '../utils/form-context';
import { FormState } from '../types';

interface IProps {
  value?: IState;
  onChange?: (state: any) => void;
  Store?: FormState;
}

interface IState {
  name: string;
  box?: string;
}

class TaskTime extends React.Component<IProps, IState> {
  public state: IState = {
    name: '',
  };
  triggerChange = (data: any = {}) => {
    const { onChange } = this.props;
    onChange && onChange(data);
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value }, () => {
      this.triggerChange(this.state);
    });
  };

  render() {
    const myVal = this.props.value!;
    return (
      <>
        <div>
          <Input
            defaultValue={myVal.name}
            value={myVal.name}
            onChange={this.onChange}
          />
        </div>
      </>
    );
  }
}

export default ContextConnect(TaskTime);
