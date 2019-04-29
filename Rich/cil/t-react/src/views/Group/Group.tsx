import * as React from 'react';
import { Table, Button } from 'antd';
import {Link} from 'react-router-dom';
type Props = {
  Group: any[];
  fetchGroup: any;
  // Router: any;
};

class Group extends React.Component<Props> {

  async componentDidMount() {
    await this.props.fetchGroup();
  }

  render() {
    const { Group} = this.props;
    // console.log(Router);
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }];
    return (
      <div>
        <div>
          <Button type="primary">
            <Link to="/group/add">添加</Link>
          </Button>
        </div>
        <Table dataSource={Group} columns={columns} />>
        </div>
    );
  }
}

export default Group;
