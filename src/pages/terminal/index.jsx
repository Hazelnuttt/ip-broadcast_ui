import React from 'react';
import '../../utils/api';
import { NavLink } from 'react-router-dom';
import {
  Card,
  Button,
  Modal,
  message,
  Form,
  Input,
  Select,
  InputNumber
} from 'antd';
import SelectT from '../../components/SelectT';
import SelectK from '../../components/SelectK';
const FormItem = Form.Item;
const { Option } = Select;

class Ter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      list: [],
      isVisible: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.requireList();
  }

  requireList = () => {
    fetch('http://198.13.50.147:8099/api/endpoint', {
      method: 'get',
      headers: {
        Authorization: localStorage.getItem('user_token')
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          loading: false,
          list: res.list.map((item, index) => {
            item.key = index;
            return item;
          })
        });
      });
  };

  handleSubmit = () => {
    let type = this.state.type;
    let data = this.userForTerops.form.getFieldsValue();
    console.log(data);
    if (type == 'add') {
      fetch('http://198.13.50.147:8099/api/endpoint/add', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('user_token')
        },
        body: {
          ...data
        }
      })
        .then(res => res.json())
        .then(res => {
          const { msg } = res;
          if (msg) {
            this.setState({
              isVisible: false
            });
            message.success('添加成功！');
            this.requireList();
          } else {
            message.error('添加失败！');
          }
        })
        .catch(err => {
          console.error(err);
          message.error('网络请求异常!');
        });
    } else {
      fetch('http://198.13.50.147:8099/api/user/edit', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('user_token')
        },
        body: {
          ...data
        }
      })
        .then(res => res.json())
        .then(res => {
          const { msg } = res;
          if (msg) {
            this.setState({
              isVisible: false
            });
            message.success('编辑成功！');
            this.requireList();
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

  handleOperator = type => {
    const { selectedItem, selectedRowKeys } = this.state;
    let item = this.state.selectedItem;
    console.log(selectedItem);
    console.log(selectedRowKeys);

    // let item = record
    if (type == 'delete') {
      Modal.confirm({
        title: '确定要删除此用户吗？',
        onOk: () => {
          fetch(
            `http://198.13.50.147:8099/api/endpoint/delete/${selectedRowKeys}`,
            {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('user_token')
              }
            }
          )
            .then(res => res.json())
            .then(res => {
              const { msg } = res;
              if (msg == 'success') {
                this.setState({
                  isVisible: false
                });
                console.log(msg);
                message.success('删除成功！');
                this.requireList();
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
        terinfo: item,
        type
      });
      console.log(selectedRowKeys);
      console.log(selectedItem);
    } else if (type == 'add') {
      this.setState({
        title: '创建用户',
        isVisible: true,
        type
      });
    }
  };

  render() {
    const { selectedRowKeys } = this.state;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'endPointId',
        width: '5%'
      },
      {
        title: '终端名称',
        dataIndex: 'endPointName',
        width: '25%'
      },
      {
        title: 'IP地址',
        dataIndex: 'ipAddress',
        width: '25%'
      },
      {
        title: '呼叫编码',
        dataIndex: 'callCode',
        width: '15%'
      },
      {
        title: '终端默认音量',
        dataIndex: 'broadcastVolume',
        width: '8%'
      },
      {
        title: '详情',
        dataIndex: '',
        key: 'w',
        render: () => (
          <a onClick={() => this.handleOperator('detail', selectedRowKeys)}>
            查看详情
          </a>
        )
      },
      {
        title: '编辑',
        dataIndex: '',
        key: 'x',
        render: () => (
          <a onClick={() => this.handleOperator('edit', selectedRowKeys)}>
            编辑
          </a>
        )
      }
    ];
    let footer = {};
    if (this.state.type == 'detail') {
      footer = {
        footer: null
      };
    }
    return (
      <>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button
            // disabled
            type="primary"
            onClick={() => this.handleOperator('add')}
          >
            新建
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleOperator('modifyV', selectedRowKeys)}
          >
            调节音量
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleOperator('delete', selectedRowKeys)}
          >
            删除
          </Button>
        </Card>
        <div className={'content-wrap'}>
          <SelectT
            columns={columns}
            rowSelection="checkbox"
            updateSelectedItem={SelectK.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedRows={this.state.selectedRows}
            selectedItem={this.state.selectedRows}
            rowKey={this.state.rowKey}
            dataSource={this.state.list}
            // pagination={this.state.pagination}
          />
        </div>
        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={this.handleSubmit}
          onCancel={() => {
            this.TerForm.props.form.resetFields();
            this.setState({
              isVisible: false,
              terinfo: ''
            });
          }}
          width={600}
          {...footer}
        >
          <TerForm
            terinfo={this.state.terinfo}
            type={this.state.type}
            wrappedComponentRef={inst => (this.TerForm = inst)}
          />
        </Modal>
      </>
    );
  }
}

export default Ter;

class TerForm extends React.Component {
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
    const terinfo = this.props.terinfo || {};
    const type = this.props.type;
    return (
      <Form layout="horizontal">
        {/* <FormItem label="ip使用者" {...formItemLayout}>
          {terinfo && type == 'detail'
            ? terinfo.username
            : getFieldDecorator('endPointName', {
                initialValue: terinfo.username
              })(<Input type="text" placeholder="请输入终端名称" />)}
        </FormItem> */}
        {/* <FormItem label="用户角色" {...formItemLayout}>
          {terinfo && type == 'detail'
            ? this.getState(terinfo.ROLE)
            : getFieldDecorator('ROLE', {
                initialValue: terinfo.ROLE
              })(
                <Select>
                  <Option value={'ROLE_USER'}>普通用户</Option>
                  <Option value={'ROLE_ADMIN'}>管理员</Option>
                  <Option value={'ROLE_SIP'}>SIP</Option>
                </Select>
              )}
        </FormItem> */}
        <FormItem label="终端名称" {...formItemLayout}>
          {terinfo && type == 'detail'
            ? terinfo.endPointName
            : getFieldDecorator('endPointName', {
                initialValue: terinfo.endPointName
              })(<Input type="text" placeholder="请输入终端名称" />)}
        </FormItem>
        <FormItem label="IP地址" {...formItemLayout}>
          {terinfo && type == 'detail'
            ? terinfo.ipAddress
            : getFieldDecorator('ipAddress', {
                initialValue: terinfo.ipAddress
              })(<Input type="text" placeholder="请输入ip地址" />)}
        </FormItem>
        <FormItem label="呼叫编码" {...formItemLayout}>
          {terinfo && type == 'detail'
            ? terinfo.callCode
            : getFieldDecorator('callCode', {
                initialValue: terinfo.callCode
              })(<Input type="text" placeholder="请输入呼叫编码" />)}
        </FormItem>
        <FormItem label="音量" {...formItemLayout}>
          {terinfo && type == 'detail'
            ? terinfo.broadcastVolume
            : getFieldDecorator('broadcastVolume', {
                initialValue: terinfo.broadcastVolume
              })(<InputNumber min={0} max={100} defaultValue={60} />)}
        </FormItem>
      </Form>
    );
  }
}

TerForm = Form.create({})(TerForm);

class FilterForm extends React.Component {
  handleSearch = () => {
    let data = this.props.form.getFieldsValue();
    console.log(data);
    //查询有点问题
    fetch('http://198.13.50.147:8099/api/endpoint/findby', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('user_token')
      },
      body: {
        ...data
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        // if (res.status == 'success') {
        this.setState({
          loading: false,
          pageNum: res.pageNum,
          list: res.list.map((item, index) => {
            item.key = index;
            return item;
          })
        });
        // }
      });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSearch}>
        <FormItem label="终端名称">
          {getFieldDecorator('endPointName')(<Input placeholder="用户名" />)}
        </FormItem>
        <FormItem label="ip地址">
          {getFieldDecorator('ipAddress')(<Input placeholder="ip地址" />)}
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
