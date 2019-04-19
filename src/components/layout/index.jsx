import React from 'react';
import NavbarMenu from './menu.jsx';
import NavTop from './navtop.jsx';
import './index.scss';
import { Col } from 'antd';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="top">
        <Col span={4}>
          <NavbarMenu />
        </Col>
        <Col span={20}>
          <NavTop />
        </Col>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
