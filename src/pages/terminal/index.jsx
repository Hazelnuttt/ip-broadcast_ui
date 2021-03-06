import React from 'react';
import '../../utils/api';
import {
  Pagination,
  Transfer,
  Card,
  Button,
  Modal,
  message,
  Form,
  Input,
  Select,
  InputNumber,
  Table
} from 'antd';
import './index.scss';
import SelectK from '../../components/SelectK';
import { Redirect } from 'react-router';
const FormItem = Form.Item;
const { Option } = Select;

class Ter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: [],
      loading: false,
      list: [],
      isVisible: false,
      targetKeys: [],
      isLogin: true
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
          total: res.total,
          loading: false,
          list: res.list.map((item, index) => {
            item.key = item.endPointId;
            return item;
          })
        });
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

  handleChange = targetKeys => {
    this.setState({ targetKeys });
    console.log(targetKeys);
  };

  handleSubmit = () => {
    let targetKeys = this.state.targetKeys;
    let type = this.state.type;
    let data = this.TerForm.props.form.getFieldsValue();

    var enddata1 = {
      ...data,
      srv_ip: null,
      default_volume: 50,
      dial_volume: 60,
      shortcut_frequency: 0,
      shortcut_interval: 0,
      type: '1',
      note: null,
      status: null,
      version: 0,
      data: targetKeys
    };

    if (type == 'add') {
      console.log(enddata1);
      fetch('http://198.13.50.147:8099/api/endpoint/add', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('user_token')
        },
        body: enddata1
      })
        .then(res => res.json())
        .then(res => {
          const { msg } = res;
          if (msg == 'success') {
            this.setState({
              isVisible: false
            });
            console.log(msg);
            message.success('添加成功！');
            this.onChange(this.state.pageNumber);
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
      var enddata2 = {
        id: this.state.terinfo.endPointId,
        ...data,
        srv_ip: '',
        default_volume: 50,
        dial_volume: 60,
        shortcut_frequency: 0,
        shortcut_interval: 0,
        type: '1',
        note: '',
        status: 0,
        version: 0,
        data: targetKeys
      };
      console.log(enddata2);
      fetch('http://198.13.50.147:8099/api/endpoint/update', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('user_token')
        },
        body: JSON.stringify(enddata2)
      })
        .then(res => res.json())
        .then(res => {
          const { msg, msg2 } = res;
          console.log(msg2);
          if (msg == 'success') {
            this.setState({
              isVisible: false
            });
            console.log(msg);
            message.success(msg2);
            message.success('编辑成功！');
            this.onChange(this.state.pageNumber);
          } else if (msg == 'no_permission') {
            console.log(msg);
            message.error('没有权限！');
          } else {
            console.log(msg);
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
              console.log(selectedRowKeys);
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

  onChange = pageNumber => {
    this.setState({
      pageNumber,
      loading: true
    });
    fetch(`http://198.13.50.147:8099/api/endpoint?page=${pageNumber}`, {
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': 'Authorization',
        Authorization: localStorage.getItem('user_token')
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(
          `http://198.13.50.147:8099/api/endpoint?page=${pageNumber}`
        );
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

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedItem: selectedRows[0]
    });
  };

  transferMsg(res) {
    this.setState({
      total: res.total,
      loading: false,
      list: res.list.map(item => {
        item.key = item.id;
        return item;
      })
    });
  }

  render() {
    const { isLogin } = this.state;
    const { selectedRowKeys } = this.state;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'endPointId',
        width: '10%'
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
        width: '25%'
      },
      {
        title: '终端默认音量',
        dataIndex: 'broadcastVolume',
        width: '15%'
      }
    ];
    let footer = {};
    if (this.state.type == 'detail') {
      footer = {
        footer: null
      };
    }

    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: this.onSelectChange,
      onSelect: (record, selected, selectedRows) => {
        console.log('...');
      }
    };
    return isLogin == false ? (
      <Redirect to="/login" />
    ) : (
      <>
        <Card>
          <FilterForm transferMsg={res => this.transferMsg(res)} />
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
            onClick={() => this.handleOperator('detail', selectedRowKeys)}
          >
            查看详情
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleOperator('edit', selectedRowKeys)}
          >
            编辑
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleOperator('delete', selectedRowKeys)}
          >
            删除
          </Button>
        </Card>
        <div className={'content-wrap'}>
          <Table
            columns={columns}
            rowSelection={rowSelection}
            loading={this.state.loading}
            updateSelectedItem={SelectK.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedRows={this.state.selectedRows}
            selectedItem={this.state.selectedRows}
            rowKey={this.state.rowKey}
            dataSource={this.state.list}
            pagination={false}
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
            this.TerForm.props.form.resetFields();
            this.setState({
              isVisible: false,
              terinfo: ''
            });
          }}
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
          <Transfer
            dataSource={this.state.list}
            showSearch
            titles={[' [复制音量]', '[到此终端]']}
            listStyle={{
              width: 210,
              height: 300
            }}
            operations={['to right', 'to left']}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            render={item => item.endPointName}
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
        <FormItem label="终端名称" {...formItemLayout}>
          {terinfo && type == 'detail'
            ? terinfo.endPointName
            : getFieldDecorator('name', {
                initialValue: terinfo.endPointName
              })(<Input type="text" placeholder="请输入终端名称" />)}
        </FormItem>
        <FormItem label="IP地址" {...formItemLayout}>
          {terinfo && type == 'detail'
            ? terinfo.ipAddress
            : getFieldDecorator('ip_addr', {
                initialValue: terinfo.ipAddress
              })(<Input type="text" placeholder="请输入ip地址" />)}
        </FormItem>
        <FormItem label="呼叫编码" {...formItemLayout}>
          {terinfo && type == 'detail'
            ? terinfo.callCode
            : getFieldDecorator('call_code', {
                initialValue: terinfo.callCode
              })(<Input type="text" placeholder="请输入呼叫编码" />)}
        </FormItem>
        <FormItem label="音量" {...formItemLayout}>
          {terinfo && type == 'detail'
            ? terinfo.broadcastVolume
            : getFieldDecorator('broadcast_volume', {
                initialValue: terinfo.broadcastVolume || 60
              })(<InputNumber min={0} max={100} />)}
        </FormItem>
      </Form>
    );
  }
}
TerForm = Form.create({})(TerForm);

class FilterForm extends React.Component {
  handleFindby = () => {
    let data = this.props.form.getFieldsValue();
    console.log(data);
    //查询有点问题
    fetch('http://198.13.50.147:8099/api/endpoint/findby', {
      method: 'post',
      headers: {
        // 'Access-Control-Allow-Origin': 'Authorization',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('user_token')
      },
      body: JSON.stringify({
        ...data
      })
    })
      .then(res => res.json())
      .then(res => {
        this.props.transferMsg(res);
      })
      .catch(err => {
        console.error(err);
        message.error('网络请求异常!');
      });
  };

  requireList = () => {
    fetch('http://198.13.50.147:8099/api/endpoint', {
      method: 'get',
      headers: {
        Authorization: localStorage.getItem('user_token')
      }
    })
      .then(res => res.json())
      .then(res => {
        this.props.transferMsg(res);
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
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="终端名称">
          {getFieldDecorator('name')(<Input placeholder="用户名" />)}
        </FormItem>
        <FormItem label="ip地址">
          {getFieldDecorator('ipAddress')(<Input placeholder="ip地址" />)}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            onClick={this.handleFindby}
            style={{ margin: '0 20px' }}
          >
            查询
          </Button>
          <Button onClick={this.requireList}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create({})(FilterForm);
