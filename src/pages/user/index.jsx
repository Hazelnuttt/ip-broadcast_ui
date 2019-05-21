import React from 'react';
import '../../utils/api';
import {
  Pagination,
  Card,
  Button,
  Table,
  Modal,
  message,
  Form,
  Input,
  Select
} from 'antd';
import { Redirect } from 'react-router';
import './index.scss';
const FormItem = Form.Item;
const { Option } = Select;

class User extends React.Component {
  state = {
    loading: false,
    pageNumber: [],
    list: [],
    isVisible: false,
    isLogin: true
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.requireList();
  }

  requireList = () => {
    fetch('http://198.13.50.147:8099/api/user', {
      method: 'get',
      headers: {
        //第一条不明原因，貌似后端跨域问题
        'Access-Control-Allow-Origin': 'Authorization',
        Authorization: localStorage.getItem('user_token')
      }
    })
      .then(res => res.json())
      .then(res => {
        // if (res.status == 'success') { 不规范之处：1.status 2.code
        this.setState({
          total: res.total,
          loading: false,
          list: res.list.map(item => {
            item.key = item.id;
            return item;
          })
        });

        // }
      })
      .catch(err => {
        if (err == 'SyntaxError: Unexpected token = in JSON at position 6') {
          message.error('您未登录！');
          this.setState({ isLogin: false });
        } else {
          console.log(err);
          message.error('网络请求异常！');
        }
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleSubmit = () => {
    let type = this.state.type;
    let data = this.userForm.props.form.getFieldsValue();

    var test = JSON.stringify({
      //由于 1.id等一些外加信息的传递 2.无用信息的传递
      ...data,
      language_kind: 0,
      email: ''
    });

    if (type == 'add') {
      this.userForm.props.form.resetFields();
      fetch('http://198.13.50.147:8099/api/user/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('user_token')
        },
        body: test
      })
        .then(res => res.json())
        .then(res => {
          console.log(test);
          const { msg } = res;
          if (msg == 'success') {
            this.setState({
              isVisible: false
            });
            console.log(msg);
            message.success('添加成功！');
            this.requireList();
          } else if (msg == 'no_permission') {
            console.log(msg);
            message.error('没有权限！');
          } else {
            console.log(msg);
            message.error('添加失败！');
          }
        })
        .catch(err => {
          console.error(err);
          message.error('网络请求异常!');
        });
    } else {
      var test1 = JSON.stringify({
        id: this.state.userinfo.id,
        ...data,
        language_kind: 0,
        email: ''
      });
      fetch('http://198.13.50.147:8099/api/user/update', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('user_token')
        },
        body: test1
      })
        .then(res => res.json())
        .then(res => {
          console.log(test1);
          const { msg } = res;
          if (msg == 'success') {
            console.log(msg);
            message.success('编辑成功！');
            this.onChange(this.state.pageNumber);
          } else if (msg == 'no_permission') {
            console.log(msg);
            message.error('没有权限！');
          } else {
            message.error('编辑失败！');
          }
        })
        .catch(err => {
          console.error(err);
          message.error('网络请求异常!');
        });
    }
  };

  handleOperator = (type, record) => {
    let item = record;
    if (type == 'delete') {
      console.log(item);
      Modal.confirm({
        title: '确定要删除此用户吗？',
        onOk: () => {
          fetch(`http://198.13.50.147:8099/api/user/delete/${item.id}`, {
            method: 'post',
            headers: {
              Authorization: localStorage.getItem('user_token')
            }
          })
            .then(res => res.json())
            .then(res => {
              const { msg } = res;
              if (msg == 'success') {
                this.setState({
                  isVisible: false
                });
                console.log(msg);
                message.success('删除成功！');
                this.onChange(this.state.pageNumber);
              } else {
                console.log(msg);
                message.error('删除失败！');
              }
            })
            .catch(err => {
              console.error(err);
              message.error('网络请求异常!');
            });
        }
      });
    } else if (type == 'edit' || type == 'detail') {
      this.setState({
        title: type == 'edit' ? '编辑用户' : '查看详情',
        isVisible: true,
        userinfo: item,
        type
      });
    } else if (type == 'add') {
      this.setState({
        title: '创建用户',
        isVisible: true,
        type
      });
    }
  };

  onChange = pageNumber => {
    this.setState({
      pageNumber,
      loading: true
    });
    fetch(`http://198.13.50.147:8099/api/user?page=${pageNumber}`, {
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': 'Authorization',
        Authorization: localStorage.getItem('user_token')
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(`http://198.13.50.147:8099/api/user?page=${pageNumber}`);
        // if (res.status == 'success') {
        this.setState({
          total: res.total,
          loading: false,
          list: res.list.map((item, index) => {
            item.key = index;
            return item;
          })
        });
        // }
      });
  };

  render() {
    const { isLogin } = this.state;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width: '5%'
      },
      {
        title: '用户名称',
        dataIndex: 'username',
        width: '25%'
      },
      {
        title: '用户类别',
        dataIndex: 'role',
        width: '25%',
        render(ROLE) {
          let config = {
            ROLE_USER: '普通用户',
            ROLE_ADMIN: '管理员',
            ROLE_SIP: 'SIP'
          };
          return config[ROLE];
        }
      },
      {
        title: '详情',
        dataIndex: '',
        key: 'w',
        render: record => (
          <a onClick={() => this.handleOperator('detail', record)}>查看详情</a>
        )
      },
      {
        title: '编辑',
        dataIndex: '',
        key: 'x',
        render: record => (
          <a
            onClick={() => {
              this.handleOperator('edit', record);
            }}
          >
            编辑
          </a>
        )
      },
      {
        title: '删除',
        dataIndex: '',
        key: 'y',
        render: record => (
          <a onClick={() => this.handleOperator('delete', record)}>删除</a>
        )
      }
    ];
    let footer = {};
    if (this.state.type == 'detail') {
      footer = {
        footer: null
      };
    }

    return isLogin == false ? (
      <Redirect to="/login" />
    ) : (
      <>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={() => this.handleOperator('add')}>
            新建
          </Button>
        </Card>
        <div className={'content-wrap'}>
          <Table
            columns={columns}
            dataSource={this.state.list}
            pagination={false}
            loading={this.state.loading}
          />
          <Pagination
            className="pagination"
            defaultCurrent={1}
            total={this.state.total}
            onChange={this.onChange}
          />
        </div>
        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={() => {
            this.handleSubmit();
            this.userForm.props.form.resetFields();
            this.setState({
              isVisible: false,
              userinfo: ''
            });
          }}
          onCancel={() => {
            this.userForm.props.form.resetFields();
            this.setState({
              isVisible: false,
              userinfo: ''
            });
          }}
          width={600}
          {...footer}
        >
          <UserForm
            userinfo={this.state.userinfo}
            type={this.state.type}
            wrappedComponentRef={inst => (this.userForm = inst)}
          />
        </Modal>
      </>
    );
  }
}

export default User;

class UserForm extends React.Component {
  getState = ROLE => {
    return {
      ROLE_USER: '普通用户',
      ROLE_ADMIN: '管理员',
      ROLE_SIP: 'SIP'
    }[ROLE];
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    const userinfo = this.props.userinfo || {};
    const type = this.props.type;
    return (
      <Form layout="horizontal">
        <FormItem label="用户名称" {...formItemLayout}>
          {userinfo && type == 'detail'
            ? userinfo.username
            : getFieldDecorator('username', {
                initialValue: userinfo.username
              })(<Input type="text" placeholder="请输入姓名" />)}
        </FormItem>
        <FormItem label="密码" {...formItemLayout}>
          {userinfo && type == 'detail'
            ? userinfo.password
            : getFieldDecorator('password', {
                initialValue: userinfo.password
              })(<Input type="text" placeholder="请输入密码" />)}
        </FormItem>
        <FormItem label="用户角色" {...formItemLayout}>
          {userinfo && type == 'detail'
            ? this.getState(userinfo.role)
            : getFieldDecorator('role', {
                initialValue: userinfo.role
              })(
                <Select>
                  <Option value={'ROLE_USER'}>普通用户</Option>
                  <Option value={'ROLE_ADMIN'}>管理员</Option>
                  <Option value={'ROLE_SIP'}>SIP</Option>
                </Select>
              )}
        </FormItem>
      </Form>
    );
  }
}

UserForm = Form.create({})(UserForm);

class FilterForm extends React.Component {
  handleSearch = () => {
    let data = this.props.form.getFieldsValue();
    console.log(data);
    //查询有点问题
    fetch('http://198.13.50.147:8099/api/user/findby', {
      method: 'post',
      headers: {
        // 'Access-Control-Allow-Origin': 'Authorization',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('user_token')
      },
      body: JSON.stringify({
        // ...data
        name: 'repeat2'
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.list);
        // if (res.status == 'success') {
        this.setState({
          loading: false,
          pageNum: res.pageNum,
          list: res.list.map((item, index) => {
            item.key = index;
            return item;
          })
        });
        // console.log(list)
        // }
      })
      .catch(err => {
        console.error(err);
        message.error('网络请求异常!');
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="用户名称">
          {getFieldDecorator('username')(<Input placeholder="用户名" />)}
        </FormItem>
        <FormItem label="用户角色">
          {getFieldDecorator('role')(
            <Select style={{ width: 120 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="ROLE_USER">普通用户</Option>
              <Option value="ROLE_ADMIN">管理员</Option>
              <Option value="ROLE_SIP">SIP</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            onClick={this.handleSearch}
            style={{ margin: '0 20px' }}
          >
            查询
          </Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create({})(FilterForm);
