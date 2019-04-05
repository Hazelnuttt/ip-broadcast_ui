import React from 'react';
import Home from './home/home.js';
import {
  Form,
  Input,
  Button,
  Select,
  Icon,
  Table,
  Col,
  Row,
  message,
  Pagination,
  Popconfirm
} from 'antd';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import fetch from 'node-fetch';
import './home/home.css';
import FormItem from 'antd/lib/form/FormItem';
const { Option } = Select;

class Man_user extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idens: '',
      username: '',
      data0: [],
      total: '',
      pagination: {},
      loading: false
    };
    this.handleIdentifyChange = this.handleIdentifyChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getData() {
    this.setState({ loading: true });
    fetch('http://198.13.50.147:8099/api/user', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('user_token')
      }
    })
      .then(res => res.json())
      .then(res => {
        const { list, navigatepageNums, total } = res;
        const { pagination } = this.state;
        pagination.pages = navigatepageNums.pages;
        pagination.pageSize = navigatepageNums.pageSize;
        pagination.pageNum = navigatepageNums.pageNum;
        const arr = [];
        list.forEach(function(item) {
          arr.push({ key: item.id, username: item.username, idens: item.role });
        });
        this.setState({
          data0: arr,
          loading: false,
          pagination,
          total
        });
      });
  }

  componentDidMount() {
    this.getData();
  }

  //可能有问题
  handleIdentifyChange = value => {
    this.setState({
      idens: value
    });
  };

  handleChange = e => {
    this.setState({ username: e.target.value });
  };

  handleSearch() {
    fetch('http://198.13.50.147:8099/api/user/findby/', {
      method: 'get',
      headers: {
        token: localStorage.getItem('user_token')
      }
    })
      .then(res => res.json())
      .then(res => {
        const { list, navigatepageNums } = res;
        const { pagination } = this.state;
        pagination.total = navigatepageNums.pages;
        pagination.placeholder = navigatepageNums.pageSize;
        pagination.pages = navigatepageNums.pages;
        const arr = [];
        list.forEach(function(item) {
          arr.push({ key: item.id, username: item.username, idens: item.role });
        });
        this.setState({
          data0: arr,
          loading: false,
          pagination
        });
      });
  }

  handleDelete = key => {
    fetch(`http://198.13.50.147:8099/api/user/delete/${key}`, {
      method: 'get',
      headers: {
        token: localStorage.getItem('user_token')
      }
    });
    const data0 = [...this.state.data0];
    this.setState({ data0: data0.filter(item => item.key !== key) });
  };

  render() {
    const { username, data0, pagination, total } = this.state;
    const columns = [
      {
        title: '用户名称',
        dataIndex: 'username',
        // key: 'username',
        width: '25%'
      },
      {
        title: '用户类别',
        dataIndex: 'idens',
        // key: 'idens',
        filters: [
          { text: '全部', value: '' },
          { text: '普通用户', value: 'ROLE_USER' },
          { text: '管理员', value: 'ROLE_ADMIN' },
          { text: 'SIP', value: 'ROLE_SIP' }
        ],
        width: '25%'
      },
      {
        title: '编辑',
        dataIndex: '',
        // key: 'x',
        render: () => <NavLink to="/home/media">edit</NavLink>
      },
      {
        title: '删除',
        dataIndex: '',
        key: 'y',
        render: data0 => (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => this.handleDelete(data0.key)}
          >
            <a href="javascript:;">Delete</a>
          </Popconfirm>
        )
      }
    ];

    return (
      <Home>
        <Col className={'twofun'}>
          <span>
            <Icon type="sync" />
            <NavLink to="/home/user/index">刷新</NavLink>
          </span>{' '}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span>
            <Icon type="plus" />
            <NavLink to="/home/user/update">新建</NavLink>{' '}
          </span>
        </Col>
        <div className={'search'}>
          <Form layout="inline">
            <Form.Item layout="inline" label={'综合筛选'}>
              <Input
                placeholder="用户名称"
                value={username}
                onChange={this.handleChange}
              />
            </Form.Item>

            <Form.Item layout="inline" label={'用户角色'}>
              <Select
                defaultValue={''}
                style={{ width: 100 }}
                onChange={this.handleIdentifyChange}
              >
                {/* {identifyDatas.map(identifyData => (
                      <Option key={identifyData}>{identifyData}</Option>
                    ))} */}
                <Option value="">全部</Option>
                <Option value="ROLE_USER">普通用户</Option>
                <Option value="ROLE_ADMIN">管理员</Option>
                <Option value="ROLE_SIP">SIP</Option>
              </Select>
            </Form.Item>

            <FormItem layout="inline">
              <Button
                type="primary"
                onClick={this.handleSearch}
                style={{ marginRight: 10 }}
              >
                查询
              </Button>
              <Button
                type="primary"
                // onClick={this.handleReset}
                style={{ marginRight: 10 }}
              >
                重置
              </Button>
            </FormItem>
          </Form>

          <div className={'location'}>全部用户-{total}</div>
        </div>
        <div className="content">
          <Table
            columns={columns}
            dataSource={data0}
            pagination={{ pageSize: pagination[2] }}
            loading={this.state.loading}
            scroll={{ y: 350 }}
          />
        </div>
      </Home>
    );
  }
}

export default Man_user;
