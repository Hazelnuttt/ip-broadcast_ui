import React from 'react';
import fetch from 'node-fetch';
import { Input, Card, Button, Checkbox, Icon, message } from 'antd';
import { Redirect } from 'react-router';

class Login extends React.Component {
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

  getHome() {
    fetch('http://198.13.50.147:8099/api/auth/login', {
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

  setToken(ntoken) {
    return localStorage.setItem('user_token', ntoken);
  }

  handleChange = param => {
    this.setState({ ...this.state, ...param });
  };

  handleSubmit = () => {
    const { username, password, remember } = this.state;
    // var student = new Object()
    // student.username = 'sa'
    // student.password = '123ujs'
    // student.rememberMe = true

    // var json = JSON.stringify(student)

    // $.ajax(
    //   {
    //     url:"http://198.13.50.147:8099/api/auth/login",
    //     method:'post',
    //     contentType:'application/json',
    //     dataType:'json',
    //     data:JSON.stringify({
    //       student
    //     }),
    //     success:res=>{
    //       console.log(res);
    //     }
    //   }
    // )

    // console.log(json)
    fetch('http://198.13.50.147:8099/api/auth/login', {
      method: 'POST',
      headers: {
        // Authorization:
        // 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJST0xFIjoiUk9MRV9BRE1JTiIsInN1YiI6ImFkbWluNyIsImlzcyI6InVqcyIsImV4cCI6MTU1NTQxODA2OSwiaWF0IjoxNTU0ODEzMjY5fQ.PN3jwbWjrQg9Z_X8JR377NNuHK8ZXejHK4uXZm3scJ1sLZCUMwb5yBg7vfR_TjaVzkg_Z_9y3gxZ65MH-GtteA',
        // 'Accept':'application/json', //接收
        'Content-Type': 'application/json'
      }, //这两个东西不知道是哪个去接收
      body: JSON.stringify({
        username: 'sa',
        password: '123ujs',
        rememberMe: true
      })
    })
      .then(res => {
        console.log(res);
        //return res;
      })
      .then(res => {
        // console.log(res)
        // const headers = res.headers
        // console.log(res.headers)
        // const token = headers.get('token')
        // console.log(token)

        const { token, message } = res;
        if (token) {
          // 登录成功处理
          localStorage.removeItem('usesr_token');
          localStorage.setItem('user_token', token);
          // this.setState({ user: data });
          return <Redirect to="/home/user/index" />;
        } else {
          // const headers = res.headers
          // const message = headers.message
          // 登录失败处理
          message.error(message);
        }
      });
  };

  render() {
    const { username, password, remember } = this.state;
    return (
      <div style={{ margin: 100 }}>
        <h1 style={{ textAlign: 'center' }}>登录</h1>
        <hr />
        <br />
        <Card style={{ width: '300px', margin: 'auto' }}>
          {/* handlechange方法，浏览器向服务器发送信息(url,method,headers,body),渲染当前状态下的数据 */}
          {/* handlesubmit方法，服务器响应，(result,message,data)，浏览器渲染数据 */}
          <label>用户名</label>
          <Input
            onChange={e => this.handleChange({ username: e.target.value })}
            value={username}
            style={{ margin: '5px 0' }}
            placeholder="Enter your username"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <label>密码</label>
          <Input.Password
            onChange={e => this.handleChange({ password: e.target.value })}
            value={password}
            style={{ margin: '5px 0' }}
            placeholder="Enter your username"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <Checkbox
            onChange={e => this.handleChange({ remember: !e.target.value })}
            value={remember}
          >
            记住密码
          </Checkbox>
          <br />
          <Button
            type="primary"
            style={{ marginTop: 10 }}
            block
            onClick={this.handleSubmit}
          >
            登录
          </Button>
          <a style={{ float: 'right' }} href="">
            Register
          </a>
        </Card>
      </div>
    );
  }
}

export default Login;
