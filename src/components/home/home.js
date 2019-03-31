import React from 'react';
import fetch from 'node-fetch';
import { Redirect } from 'react-router';
import { message, Col } from 'antd';
import { Menu, Dropdown, Icon, Row } from 'antd';
import Sider from '../home/menu.js';
import '../home/home.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Input, Button, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
const { Option } = Select;
const identifyDatas = ['全部', '管理员', '普通用户', 'SIP'];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idens: identifyDatas[0]
    };
  }

  componentDidMount() {
    fetch('http://localhost:8099/home', {
      method: 'get',
      headers: {
        token: localStorage.getItem('user_token')
      }
    })
      .then(res => res.json())
      .then(res => {
        const { loginok, data } = res;
        if (loginok) {
          this.setState({ info: data });
        } else {
          message.errer('登录已过期，请重新登录！');
          return <Redirect to="/login" />;
        }
      });
  }

  handleIdentifyChange = value => {
    this.setState({
      idens: identifyDatas[value]
    });
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="http://localhost:3000/login/">切换用户</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://localhost:3000/login/">退出登录</a>
          {localStorage.removeItem('usesr_token')}
        </Menu.Item>
      </Menu>
    );
    const { name } = this.state;
    return (
      <body className={'bg'}>
        <Row>
          <Col span={4}>
            <Sider />
          </Col>
          <Col span={20} className={'right-info'}>
            <Col className={'usersetting'}>
              <Col span={5}>
                <div className={'avatar'}>
                  <Col offset={2} span={2}>
                    <Icon type="user" />
                  </Col>
                  <Col offset={1} span={19} className={'h_avatar'}>
                    欢迎您，
                    <Dropdown overlay={menu} trigger={['click']}>
                      <a className="ant-dropdown-link" href="#">
                        admin。
                        <Icon type="down" />
                      </a>
                    </Dropdown>
                  </Col>
                </div>
              </Col>
              <Col span={19}>关于 &nbsp;&nbsp; 帮助</Col>
            </Col>
            <Col className={'navbar'}>
              <Icon type="home" />
            </Col>
            <div className={'search'}>
              <Form layout="inline">
                <Form.Item layout="inline" label={'综合筛选'}>
                  <Input placeholder="用户名称" value={name} />
                </Form.Item>

                <Form.Item layout="inline" label={'用户角色'}>
                  <Select
                    defaultValue={identifyDatas[0]}
                    style={{ width: 100 }}
                    onChange={this.handleIdentifyChange}
                  >
                    {identifyDatas.map(identifyData => (
                      <Option key={identifyData}>{identifyData}</Option>
                    ))}
                    {/* <Option value="all">全部</Option>
                                <Option value="user">普通用户</Option>
                                <Option value="admin">管理员</Option>
                                <Option value="sip">SIP</Option> */}
                  </Select>
                </Form.Item>

                <FormItem layout="inline">
                  <Button onClick={this.handleSearch}>查询</Button>
                  <Button
                  // onClick={this.handleReset}
                  >
                    重置
                  </Button>
                </FormItem>
              </Form>

              <div className={'location'}>全部用户-</div>
            </div>
            <div className={'content'}>{this.props.children}</div>
          </Col>
        </Row>
      </body>
    );
  }
}

export default Home;
