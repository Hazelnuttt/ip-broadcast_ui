import React from 'react';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import MenuConfig from '../../config/menuConfig';
import { connect } from 'react-redux';
import { switchMenu } from '../../redux/action';
import './index.scss';
const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component {
  handleClick = ({ item, key }) => {
    const { dispatch } = this.props;
    dispatch(switchMenu(item.props.title));
    if (key == this.state.currentKey) {
      return false;
    }
    this.setState({
      currentKey: key
    });
  };

  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig);
    this.setState({
      menuTreeNode
    });
  }
  //菜单渲染
  renderMenu = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  };

  render() {
    return (
      <div className="nav-left">
        <NavLink to="/home/index">
          <div className="logo">
            <img src="/assets/logo-ant.svg" alt="" />
            <h1>IP-BROADCAST MS</h1>
          </div>
        </NavLink>
        <Menu
          onClick={this.handleClick}
          theme="dark"
          defaultSelectedKeys={['/home/index']}
        >
          {this.state.menuTreeNode}
        </Menu>
      </div>
    );
  }
}

export default connect()(NavLeft);
