import React from 'react';
import fetch from 'node-fetch';
import { Redirect } from 'react-router';
import { message } from 'antd';
// import TokenStorage from '../utils/storage'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: ''
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/home', {
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

  render() {
    const { info } = this.state;
    return <h1>{info}</h1>;
  }
}

export default Home;
