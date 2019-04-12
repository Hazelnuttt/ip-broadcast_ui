import React from 'react';
import Home from './home/home.js';
import fetch from 'node-fetch';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Input, Card, Icon, Radio, Button, message, Form, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import './home/home.css';
const { Option } = Select;
const RadioGroup = Radio.Group;

class Newuser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      user: null,
      remember: false,
      token: ''
      //用户信息
    };
  }

  componentDidMount() {
    // console.log(this.props.visible)
    // console.log(this.props.data_edit)
    fetch('http://198.13.50.147:8099/api/user/add', {
      method: 'get',
      headers: {
        // token: localStorage.getItem('user_token')
        Authorization:
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJST0xFIjoiUk9MRV9TSVAiLCJzdWIiOiJzYSIsImlzcyI6InVqcyIsImV4cCI6MTU1NTQxOTc4MiwiaWF0IjoxNTU0ODE0OTgyfQ.4XZrKueziyVUcuzBuC84w_yy7hLB_Mur5xEjMcezE2ZFnra6EIYrPpltQvLR4BCjCRNDqelwO32P8_HqjOZ5uQ'
      }
    })
      .then(res => res.json())
      .then(res => {
        const { loginok } = res;
        if (!loginok) {
          message.error('登录已过期，请重新登录！');
          return <Redirect to="/login" />;
        }
      });
    // // console.log('hello');
  }

  handleChange = param => {
    this.setState({ ...this.state, ...param });
  };

  handleIdentifyChange = value => {
    this.setState({
      idens: value
    });
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value
    });
  };

  handleSubmit = () => {
    const { username, password, remember } = this.state;
    fetch('http://198.13.50.147:8099/api/user/add', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        // token: localStorage.getItem('user_token'),
        Authorization:
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJST0xFIjoiUk9MRV9TSVAiLCJzdWIiOiJzYSIsImlzcyI6InVqcyIsImV4cCI6MTU1NTQxOTc4MiwiaWF0IjoxNTU0ODE0OTgyfQ.4XZrKueziyVUcuzBuC84w_yy7hLB_Mur5xEjMcezE2ZFnra6EIYrPpltQvLR4BCjCRNDqelwO32P8_HqjOZ5uQ'
      },
      body: JSON.stringify({
        username,
        password,
        remember
      })
    })
      .then(res => res.json())
      .then(res => {
        const { loginSuccess, message1 } = res;
        if (loginSuccess) {
          // 登录成功处理
          // 一个参数也不知···········
          return <Redirect to="/home/user/index" />;
        } else {
          // 登录失败处理
          message.error(message1);
        }
      });
    // console.log('hello2');
  };

  render() {
    //  console.log(this.props.visible)
    // console.log(this.props.data_edit)
    const { username, password } = this.state;
    //console.log('hello')
    return (
      <Home>
        <div style={{ margin: 100 }}>
          <h1 style={{ textAlign: 'center' }}>新建用户</h1>
          <hr />
          <br />
          <Card style={{ width: '300px', margin: 'auto' }}>
            {/* handlechange方法，浏览器向服务器发送信息(url,method,headers,body),渲染当前状态下的数据 */}
            {/* handlesubmit方法，服务器响应，(result,message,data)，浏览器渲染数据 */}
            <label>用户名</label>
            <Input
              onChange={e => this.handleChange({ username: e.target.value })}
              value={
                this.props.visible ? this.props.data_edit.username : username
              }
              style={{ margin: '5px 0' }}
              placeholder="Enter your username"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
            <label>登录密码</label>
            <Input.Password
              onChange={e => this.handleChange({ password: e.target.value })}
              value={
                this.props.visible ? this.props.data_edit.password : password
              }
              style={{ margin: '5px 0' }}
              placeholder="Enter your username"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />

            <Form>
              <Form.Item layout="inline" label={'用户角色'}>
                <Select
                  defaultValue={'ROLE_USER'}
                  style={{ width: 100 }}
                  onChange={this.handleIdentifyChange}
                >
                  {/* {identifyDatas.map(identifyData => (
                      <Option key={identifyData}>{identifyData}</Option>
                    ))} */}
                  <Option value="ROLE_USER">普通用户</Option>
                  <Option value="ROLE_ADMIN">管理员</Option>
                  <Option value="ROLE_SIP">SIP</Option>
                </Select>
              </Form.Item>
            </Form>

            <RadioGroup onChange={this.onChange} defaultValue={false}>
              是否记住密码
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </RadioGroup>
            <br />
            <Button
              type="primary"
              style={{ marginTop: 10, marginRight: 10 }}
              onClick={this.handleSubmit}
            >
              保存并创建
            </Button>
            <Button type="primary" style={{ marginTop: 10 }}>
              <NavLink to="/home/user/index">放弃</NavLink>
            </Button>
          </Card>
        </div>
      </Home>
    );
  }
}

export default Newuser;
