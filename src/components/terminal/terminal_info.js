import React from 'react';
import { Transfer, Button } from 'antd';
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
      mockData: []
    };
  }

  // getMock = () => {
  //   const targetKeys = []
  //   const { mockData } = this.state
  //   for (let i = 0; i < 3; i++) {
  //     const data_ter = {
  //       key: i,
  //       title: data_ter[i].Name
  //       // description: `description of content${i + 1}`,
  //       // chosen: Math.random() * 2 > 1,
  //     }

  //     // mockData.push(data_ter)
  //   }
  //   this.setState({ mockData, targetKeys })
  // }

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
            title: item.endPointName,
            description: item.ipAddress,
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

  handleChange = targetKeys => {
    this.setState({ targetKeys });
    console.log(targetKeys);
  };

  renderItem = item => {
    const customLabel = (
      <span className="custom-item">
        {item.title} - {item.description}
      </span>
    );
    return {
      label: customLabel, // for displayed item
      value: item.title // for title and filter matching
    };
  };

  render() {
    return (
      <div className="tab" style={{ marginLeft: 250 }}>
        <h1>info</h1>
        <Transfer
          dataSource={this.state.data_ter}
          showSearch
          listStyle={{
            width: 300,
            height: 400
          }}
          operations={['to right', 'to left']}
          targetKeys={this.state.targetKeys}
          onChange={this.handleChange}
          render={this.renderItem}
        />
      </div>
    );
  }
}

export default Man_info;
