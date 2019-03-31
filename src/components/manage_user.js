import React from 'react';
import Home from './home/home.js';
import { Form, Input, Button, Select, Icon, Table, Col, Row } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import './home/home.css';
import Highlighter from 'react-highlight-words';
const { Option } = Select;
const data0 = [
  {
    key: '1',
    name: 'A',
    idens: '管理员',
    action1: '编辑',
    action1: ''
  },
  {
    key: '2',
    name: 'B',
    idens: '普通用户',
    action1: '编辑',
    action2: '删除'
  },
  {
    key: '3',
    name: 'B',
    idens: '普通用户',
    action1: '编辑',
    action2: '删除'
  },
  {
    key: '4',
    name: 'A',
    idens: '管理员',
    action1: '编辑',
    action1: ''
  }
];

const data1 = [
  {
    key: '5',
    ipname: '123',
    ip: '123',
    code: '',
    volume: '20'
  },
  {
    key: '6',
    ipname: '123',
    ip: '123',
    code: '',
    volume: '20'
  },
  {
    key: '7',
    ipname: '123',
    ip: '123',
    code: '',
    volume: '20'
  },
  {
    key: '8',
    ipname: '123',
    ip: '123',
    code: '',
    volume: '20'
  }
];

class Man_user extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      searchText: ''
    };
  }

  // handleSearch = (e) => {
  //     e.preventDefault();
  //     this.props.form.validateFields((err, values) => {
  //       console.log('Received values of form: ', values);
  //     });
  //   }

  // handleReset = () => {
  //     this.props.form.resetFields();
  //   }

  render() {
    const { name } = this.state;
    const columns1 = [
      {
        title: '用户名称',
        dataIndex: 'name',
        key: 'name',
        width: '25%'
        //   ...this.getColumnSearchProps('name')
      },
      {
        title: '用户类别',
        dataIndex: 'idens',
        key: 'idens',
        width: '25%'
        //   ...this.getColumnSearchProps('age')
      },
      {
        title: '编辑',
        dataIndex: 'action1',
        key: 'action1',
        width: '25%'
        //   ...this.getColumnSearchProps('action')
      },
      {
        title: '删除',
        dataIndex: 'action2',
        key: 'action2',
        width: '25%'
        // ...this.getColumnSearchProps('action')
      }
    ];
    const columns2 = [
      {
        title: '终端名称',
        dataIndex: 'ipname',
        key: 'ipname',
        width: '30%'
        //   ...this.getColumnSearchProps('name')
      },
      {
        title: 'IP地址',
        dataIndex: 'ip',
        key: 'ip',
        width: '30%'
        //   ...this.getColumnSearchProps('age')
      },
      {
        title: '呼叫编码',
        dataIndex: 'code',
        key: 'code',
        width: '15%'
        //   ...this.getColumnSearchProps('action')
      },
      {
        title: '终端默认音量',
        dataIndex: 'volume',
        key: 'volume',
        width: '25%'
        //   ...this.getColumnSearchProps('action')
      }
    ];
    return (
      <Home>
        <section>
          <Row>
            <Col span={9}>
              <Table columns={columns1} dataSource={data0} />
            </Col>
            <Col span={15}>
              <Table columns={columns2} dataSource={data1} />
            </Col>
          </Row>
        </section>
      </Home>
    );
  }
}

export default Form.create()(Man_user);
