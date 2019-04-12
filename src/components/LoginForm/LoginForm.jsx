import React, { Component } from 'react';
import { Input, Card, Button, Checkbox, Icon, Form, message } from 'antd';
import { Link } from 'react-router-dom';
import { LOGIN_URL } from '../../utils/api';
import './LoginForm.scss';

class BaseLoginForm extends Component {
  state = {
    loading: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });
        fetch(LOGIN_URL, {
          method: 'POST',
          body: JSON.stringify(values)
        })
          .then(_res => {
            console.log(_res);
            return _res.json();
          })
          .then(res => {
            // TODO:
            // const { loginSuccess, message1, token } = res;
            // if (loginSuccess) {
            //   // 登录成功处理
            //   localStorage.removeItem("usesr_token");
            //   localStorage.setItem("user_token", token);
            //   // this.setState({ user: data });
            //   return <Redirect to="/home/user/index" />;
            // } else {
            //   // 登录失败处理
            //   message.error(message1);
            // }
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
    return (
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
              {getFieldDecorator('remember', {
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
