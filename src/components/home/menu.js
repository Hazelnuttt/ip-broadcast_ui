import { Menu, Icon, Col } from 'antd';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import './home.css';

const SubMenu = Menu.SubMenu;

class Sider extends React.Component {
  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    selectkeys: ['2'],
    openKeys: []
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  render() {
    return (
      <Menu
        mode="vertical"
        theme="dark"
        defaultSelectedKeys={['1']}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        //
        className={'menu'}
      >
        <Menu.Item key="1">
          <NavLink to="/home/user/index">
            <span>
              <Icon type="home" />
              <span>主面板</span>
            </span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/home/user/index">
            <span>
              <Icon type="solution" />
              <span>用户管理</span>
            </span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/home/ter">
            <span>
              <Icon type="switcher" />
              <span>终端管理</span>
            </span>
          </NavLink>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="message" />
              <span>状态监控</span>
            </span>
          }
        >
          <Menu.Item key="4">会话状态</Menu.Item>
        </SubMenu>
        <Menu.Item key="5">
          <span>
            <Icon type="layout" />
            <span>分区管理</span>
          </span>
        </Menu.Item>
        <Menu.Item key="6">
          <span>
            <Icon type="sound" />
            <span>呼叫配置</span>
          </span>
        </Menu.Item>
        <Menu.Item key="7">
          <span>
            <Icon type="bell" />
            <span>报警配置</span>
          </span>
        </Menu.Item>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="dashboard" />
              <span>定时功能</span>
            </span>
          }
        >
          <Menu.Item key="8">定时打铃</Menu.Item>
          <Menu.Item key="9">定时任务</Menu.Item>
          <Menu.Item key="10">定时巡更</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="cluster" />
              <span>遥控配置</span>
            </span>
          }
        >
          <Menu.Item key="11">遥控器</Menu.Item>
          <Menu.Item key="12">遥控话筒</Menu.Item>
        </SubMenu>
        <Menu.Item key="13">
          <span>
            <Icon type="environment" />
            <span>电子地图</span>
          </span>
        </Menu.Item>
        <Menu.Item key="15">
          <NavLink to="/home/media">
            <span>
              <Icon type="mobile" />
              <span>媒体库</span>
            </span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="16">
          <span>
            <Icon type="notification" />
            <span>录音设备</span>
          </span>
        </Menu.Item>
        <Menu.Item key="17">
          <span>
            <Icon type="setting" />
            <span>系统设置</span>
          </span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Sider;
