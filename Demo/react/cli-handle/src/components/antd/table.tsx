import React from 'react';
import Table from 'antd/lib/table';
import Modal from 'antd/lib/modal';
interface IProps {}

interface ITable {
  key?: number;
  name: string;
  age: number;
}

class MyTable extends Table<ITable> {}

const renderTable = (setShow: React.Dispatch<boolean>) => {
  return [
    {
      title: 'box',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'nice',
      dataIndex: 'age',
      key: 'age',
      render: () => {
        return (
          <a
            href="javascript:;"
            onClick={() => {
              setShow(true);
            }}>
            删除
          </a>
        );
      },
    },
  ];
};

export default function PeopleTable(props: IProps) {
  const [show, setShow] = React.useState(false);

  const tableColumns = renderTable(setShow);

  const modelSure = () => {
    console.log('确定');
    setShow(false);
  };

  return (
    <div>
      <MyTable
        dataSource={[
          {
            key: 1,
            name: 'rich',
            age: 26,
          },
        ]}
        columns={tableColumns}
      />
      <Modal
        title="Modal"
        visible={show}
        onOk={modelSure}
        onCancel={() => {
          setShow(false);
        }}
        okText="确认"
        cancelText="取消">
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Modal>
    </div>
  );
}
