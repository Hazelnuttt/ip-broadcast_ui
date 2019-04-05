import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { Redirect } from 'react-router';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmDirty: false,
      autoCompleteResult: []
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        fetch('http://localhost:3000/register', {
          method: 'post',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(values)
        })
          .then(res => res.json())
          .then(res => {
            const { registerSuccess, message, data } = res;
            if (registerSuccess) {
              // 注册成功处理
              this.setState({ user: data });
              return <Redirect to="/login" />;
            } else {
              // 注册失败处理
              message.error(message);
            }
          });
        // console.log('hello3');
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('您两次输入的密码不一致!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ margin: 100 }}>
        <h1 style={{ textAlign: 'center' }}>注册</h1>
        <hr />
        <br />
        <Card style={{ width: '300px', margin: 'auto' }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label={<span>用户名&nbsp;</span>}>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请填写您的用户名!',
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="密码">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入你的密码!'
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input type="password" />)}
            </Form.Item>

            <Form.Item label="确认密码">
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请确认你的密码!'
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
            </Form.Item>

            <Button type="primary" block onClick={this.handleSubmit}>
              注册
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(Register);
