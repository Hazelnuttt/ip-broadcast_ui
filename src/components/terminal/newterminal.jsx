import React from 'react';
import fetch from 'node-fetch';
import {
  Input,
  Card,
  Button,
  Checkbox,
  Icon,
  message,
  InputNumber
} from 'antd';
import { Redirect } from 'react-router';
import Man_ter from './manage_terminal';

class Newter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ip_address: '',
      volume: 60
    };
  }
  getHome() {
    fetch('http://198.13.50.147:8099/api/endpoint/add', {
      method: 'get',
      headers: {
        token: localStorage.getItem('user_token')
      }
    });
    //   .then(res => res.json())
    //   .then(res => {
    //     const { loginok } = res;
    //     if (loginok) {
    //       // 已登录，token没过期
    //       return <Redirect to="/home/user/index" />;
    //     }
    //   });
    // // console.log('hello');
    // .then(res => {
    //   const headers = res.headers
    //   const token = headers.token
    //   console.log(token)
    //   if (token) {
    //     return <Redirect to="/home/user/index" />
    //   }
    // })
    // .catch(err => {
    //   console.error(err)
    // })
  }

  componentDidMount() {
    this.getHome();
  }

  handleChange = param => {
    this.setState({ ...this.state, ...param });
  };

  handleChangeV = value => {
    const { volume } = this.state;
    this.setState({
      volume: value
    });
    // console.log(volume) //这边不知道有没有滞后一个操作
  };

  handleSubmit = () => {
    const { name, ip_address, volume } = this.state;
    fetch('http://198.13.50.147:8099/api/endpoint/add', {
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
          return <Redirect to="/home/ter/ter_info" />;
        } else {
          // 登录失败处理
          message.error(message1);
        }
      });
    // console.log('hello2');
  };

  render() {
    const { name, ip_address, volume } = this.state;
    // function onChange(value) {
    //   console.log('changed', value)
    // }
    return (
      <Man_ter>
        <div className="tab" style={{ marginLeft: 50, width: 300 }}>
          <h1>新建</h1>
          <label>终端名称</label>
          <Input
            onChange={e => this.handleChange({ name: e.target.value })}
            value={name}
            style={{ margin: '5px 0' }}
            placeholder="请输入终端名称"
          />
          <label>ip地址</label>
          <Input
            onChange={e => this.handleChange({ ip_address: e.target.value })}
            x={ip_address}
            style={{ margin: '5px 0' }}
            placeholder="请输入ip地址"
          />
          <label>音量</label>
          <br />
          <InputNumber
            min={0}
            max={100}
            defaultValue={60}
            onChange={this.handleChangeV}
          />
          ,
          <Button
            type="primary"
            style={{ marginTop: 10, marginRight: 10 }}
            onClick={this.handleSubmit}
          >
            保存
          </Button>
        </div>
      </Man_ter>
    );
  }
}

export default Newter;
