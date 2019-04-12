import React from 'react';
import {
  HashRouter,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import Home from '../home/home.js';

class Man_ter extends React.Component {
  state = {
    current: 'add'
  };
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <>
        <Home>
          <div>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="add">
                <NavLink to="/home/ter/add">新建终端</NavLink>
              </Menu.Item>
              <Menu.Item key="info">
                <NavLink to="/home/ter/ter_info">终端管理</NavLink>
              </Menu.Item>
              <Menu.Item key="single_edit">
                <NavLink to="/home/ter/edit_single">单个编辑</NavLink>
              </Menu.Item>
              <Menu.Item key="batch_edit">
                <NavLink to="/home/ter/edit_batch">批量编辑</NavLink>
              </Menu.Item>
            </Menu>

            <div className="tab">{this.props.children}</div>
          </div>
        </Home>
      </>
    );
  }
}

export default Man_ter;
