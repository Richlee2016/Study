import * as React from 'react';
import {Form, Button} from 'antd';
import {FormComponentProps} from 'antd/lib/form';

// interface Props {
//     getFieldDecorator(): void;
// }

interface UserFormProps extends FormComponentProps {}

class Login extends React.Component<UserFormProps> {
    render() {
        // const {getFieldDecorator} = this.props;
        return (
            <div>
                <Form>
                    <Form.Item>
                        {/* {getFieldDecorator} */}
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create<UserFormProps>()(Login);
