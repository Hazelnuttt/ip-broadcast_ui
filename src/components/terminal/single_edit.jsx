import React from 'react';
import { Input, Card, Button, Checkbox, Icon, message } from 'antd';
import Man_ter from './manage_terminal';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';

class Single_edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ip_address: '',
      volume: ''
    };
  }

  // getdata() {
  //   fetch()
  // }

  // componentDidMount() {
  //   this.getdata()
  // }

  handleChange = param => {
    this.setState({ ...this.state, ...param });
  };

  handleSubmit = () => {
    const { name, ip_address, volume } = this.state;
    fetch('http://198.13.50.147:8099/api/endpoint/update', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        // token: localStorage.getItem('user_token'),
        Authorization:
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJST0xFIjoiUk9MRV9TSVAiLCJzdWIiOiJzYSIsImlzcyI6InVqcyIsImV4cCI6MTU1NTQxOTc4MiwiaWF0IjoxNTU0ODE0OTgyfQ.4XZrKueziyVUcuzBuC84w_yy7hLB_Mur5xEjMcezE2ZFnra6EIYrPpltQvLR4BCjCRNDqelwO32P8_HqjOZ5uQ'
      },
      body: JSON.stringify({
        name,
        ip_address,
        volume
      })
    })
      .then(res => res.json())
      .then(res => {
        const { loginSuccess, message1 } = res;
        if (loginSuccess) {
          // 登录成功处理
          // 一个参数也不知···········
          return <Redirect to="/home/endpoint/index" />;
        } else {
          // 登录失败处理
          message.error(message1);
        }
      });
    // console.log('hello2');
  };

  render() {
    const { name, ip_address, volume } = this.state;
    return (
      <div className="tab" style={{ marginLeft: 240, width: 300 }}>
        <h1>single</h1>
        <label>终端名称</label>
        <Input
          onChange={e => this.handleChange({ name: e.target.value })}
          value={name}
          style={{ margin: '5px 0' }}
          placeholder="请输入终端名称"
        />
        <label>ip地址</label>
        <Input.Password
          onChange={e => this.handleChange({ ip_address: e.target.value })}
          value={ip_address}
          style={{ margin: '5px 0' }}
          placeholder="请输入ip地址"
        />
        <Button
          type="primary"
          style={{ marginTop: 10, marginRight: 10 }}
          onClick={this.handleSubmit}
        >
          保存
        </Button>
        <Button type="primary" style={{ marginTop: 10 }}>
          <NavLink to="/home/ter/index">放弃</NavLink>
        </Button>
      </div>
    );
  }
}

export default Single_edit;
