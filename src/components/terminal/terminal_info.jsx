import React from 'react';
import { Transfer, Button, Col } from 'antd';
import Man_ter from './manage_terminal';
// const mockData = []
// for (let i = 0; i < 20; i++) {
//   mockData.push({
//     key: i.toString(),
//     title: `content${i + 1}`,
//     description: `description of content${i + 1}`,
//     disabled: i % 3 < 1
//   })
// }

// const oriTargetKeys = mockData
//   .filter(item => +item.key % 3 > 1)
//   .map(item => item.key)

class Man_info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      targetKeys: [],
      data_ter: [],
      Name: [],
      disabled: false,
      mockData: [],
      key: 'info'
    };
  }

  getData() {
    this.setState({ loading: true });
    fetch('http://198.13.50.147:8099/api/endpoint', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        // token:localStorage.getItem('user_token')
        Authorization:
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJST0xFIjoiUk9MRV9BRE1JTiIsInN1YiI6ImFkbWluNyIsImlzcyI6InVqcyIsImV4cCI6MTU1NTQxODA2OSwiaWF0IjoxNTU0ODEzMjY5fQ.PN3jwbWjrQg9Z_X8JR377NNuHK8ZXejHK4uXZm3scJ1sLZCUMwb5yBg7vfR_TjaVzkg_Z_9y3gxZ65MH-GtteA'
      }
    })
      .then(res => res.json())
      .then(res => {
        const { list } = res;
        const { data_ter } = this.state;
        list.forEach(function(item) {
          data_ter.push({
            key: item.endPointId,
            Name: item.endPointName,
            Address: item.ipAddress,
            Code: item.callCode,
            Volume: item.broadcastVolume
          });
        });
        this.setState({
          data_ter,
          loading: false
        });
        console.log(data_ter);
      });
  }

  componentDidMount() {
    this.getData();
  }

  // handleDelete = targetKeys => {
  //   fetch(USER_D_URL + `${targetKeys}`, {
  //     method: 'get',
  //     headers: {
  //       // token: localStorage.getItem('user_token')
  //       Authorization:
  //         'Bearer eyJhbGciOiJIUzUxMiJ9.eyJST0xFIjoiUk9MRV9TSVAiLCJzdWIiOiJzYSIsImlzcyI6InVqcyIsImV4cCI6MTU1NTQxOTc4MiwiaWF0IjoxNTU0ODE0OTgyfQ.4XZrKueziyVUcuzBuC84w_yy7hLB_Mur5xEjMcezE2ZFnra6EIYrPpltQvLR4BCjCRNDqelwO32P8_HqjOZ5uQ'
  //     }
  //   }).catch(err => {
  //     console.log(err)
  //     message.error('网络请求异常!')
  //   })
  //   // console.log(key)
  //   const data0 = [...this.state.data0]
  //   this.setState({ data0: data0.filter(item => item.key !== key) })
  // }

  handleChange = targetKeys => {
    this.setState({ targetKeys });
    console.log(targetKeys);
  };

  renderItem = item => {
    const customLabel = (
      <span className="custom-item">
        <Col span={8}>{item.Name}</Col>
        <Col span={8}>{item.Address}</Col>
        <Col span={3}>{item.Code}</Col>
        <Col span={3}>{item.Volume}</Col>
      </span>
    );
    return {
      label: customLabel, // for displayed item
      value: item.Name // for title and filter matching
    };
  };

  render() {
    return (
      <Man_ter>
        <div className="tab" style={{ marginLeft: 50 }}>
          <h1>info</h1>
          <Transfer
            dataSource={this.state.data_ter}
            showSearch
            titles={[
              ' [终端名称]-[ip地址]-[呼叫编吗-[音量]',
              '待办： [终端名称]-[ip地址]-[呼叫编吗-[音量]'
            ]}
            listStyle={{
              width: 390,
              height: 400
            }}
            operations={['to right', 'to left']}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            render={this.renderItem}
          />
          <Button
            style={{ float: 'right', marginRight: 100 }}
            type="primary"
            htmlType="edit"
            className="edit-form-button"
            loading={this.state.loading}
          >
            编辑
          </Button>
          <Button
            style={{ float: 'right' }}
            type="primary"
            htmlType="delete"
            className="delete-form-button"
            // targetKeys={this.state.targetKeys}
            loading={this.state.loading}
          >
            {/* {
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(targetKeys)}
            >
              <a href="javascript:;">删除</a>
            </Popconfirm>
          } */}
            删除
          </Button>
        </div>
      </Man_ter>
    );
  }
}

export default Man_info;
