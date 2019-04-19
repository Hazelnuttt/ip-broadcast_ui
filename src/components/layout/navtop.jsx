import React from 'react';
import { Menu, Dropdown, Icon, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import './index.scss';

class NavTop extends React.Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="http://localhost:3000/login/">切换用户</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://localhost:3000/login/">退出登录</a>
          {localStorage.removeItem('usesr_token')}
        </Menu.Item>
      </Menu>
    );
    return (
      <>
        <div style={{ position: 'relative', marginTop: 0 }}>
          <Col className={'info'}>
            <Col span={5}>
              <Row className={'user_icon'}>
                <Col offset={2} span={2}>
                  <Icon type="user" />
                </Col>
                <Col offset={1} span={19} className={'user_name'}>
                  欢迎您，
                  <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                      admin
                      <Icon type="down" />
                    </a>
                  </Dropdown>
                </Col>
              </Row>
            </Col>
            <Col span={19}>关于 &nbsp;&nbsp; 帮助</Col>
          </Col>
          <Col className={'navbar'}>
            <Icon type="home" />
          </Col>
        </div>
      </>
    );
  }
}

export default NavTop;
