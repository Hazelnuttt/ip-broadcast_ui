import React from 'react';
import { Input, Card, Button, Checkbox, Icon, message } from 'antd';
import Man_ter from './manage_terminal';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';

class Batch_edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: ''
    };
  }

  render() {
    return (
      <div>
        <h1>batch</h1>
        <Button
          type="primary"
          style={{ marginTop: 10, marginRight: 10 }}
          onClick={this.handleSubmit}
        >
          保存
        </Button>
        <Button type="primary" style={{ marginTop: 10 }}>
          <NavLink to="/home/ter/index">放弃</NavLink>
        </Button>
      </div>
    );
  }
}

export default Batch_edit;
