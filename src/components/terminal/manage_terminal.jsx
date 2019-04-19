import React from 'react';
import {
  HashRouter,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import Layout from '../layout/index';

class Man_ter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'add',
      key: ''
    };
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <>
        <div
          className="ter_navbar"
          style={{
            marginTop: 70,
            clear: 'both',
            marginLeft: 208,
            position: 'absolute',
            width: 'auto'
          }}
        >
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item key="add">
              <NavLink to="/ter/add">新建终端</NavLink>
            </Menu.Item>
            <Menu.Item key="info">
              <NavLink to="/ter/ter_info">终端管理</NavLink>
            </Menu.Item>
            <Menu.Item key="single_edit">
              <NavLink to="/ter/edit_single">单个编辑</NavLink>
            </Menu.Item>
            <Menu.Item key="batch_edit">
              <NavLink to="/ter/edit_batch">批量编辑</NavLink>
            </Menu.Item>
          </Menu>

          <div className="tab">{this.props.children}</div>
        </div>
      </>
    );
  }
}

export default Man_ter;
