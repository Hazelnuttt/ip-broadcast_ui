import React, { Component } from 'react';
import { Input, Card, Button, Checkbox, Icon, Form, message } from 'antd';
import { Link } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';
import { LOGIN_URL } from '../../utils/api';
import './LoginForm.scss';

class BaseLoginForm extends Component {
  state = {
    loading: false,
    redirectToReferrer: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true,
          redirectToReferrer: false
        });
        fetch('http://198.13.50.147:8099/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(values)
        })
          .then(res => {
            // TODO:
            // const username = ... username本不需要后端传过来
            // const role = ....... role 其实我是想通过之后redux, 能否前端做个简单的判断权限
            const token = res.headers.get('token');
            const msg = res.headers.get('msg');
            if (msg == 'login_success') {
              localStorage.removeItem('usesr_token');
              localStorage.setItem('user_token', token);
              console.log(msg);
              this.setState({
                redirectToReferrer: true
              });
              message.success('登陆成功！');
            } else {
              console.log(msg);
              message.error(msg);
            }
          })
          .catch(err => {
            console.warn(err);
            message.error('网络请求异常!');
          })
          .finally(() => {
            this.setState({
              loading: false
            });
          });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { redirectToReferrer } = this.state;
    return redirectToReferrer ? (
      <Redirect to="/home" />
    ) : (
      <div className="LoginForm">
        <Card
          title="登录"
          headStyle={{ textAlign: 'center' }}
          style={{ width: '300px' }}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }]
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('rememberMe', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>记住我</Checkbox>)}
              {/* <a className="login-form-forgot" href="">
                Forgot password
              </a> */}
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={this.state.loading}
              >
                登录
              </Button>
              Or <Link to="/register">前往注册!</Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const LoginForm = Form.create({ name: 'normal_login' })(BaseLoginForm);
export default LoginForm;
