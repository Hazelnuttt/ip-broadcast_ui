import React from 'react';
import { Row, Col } from 'antd';
import Header from '../Header';
import Footer from '../Footer';
import NavLeft from '../NavLeft';
import '../style/index.scss';
// import Home from '../home/home';

class Layout extends React.Component {
  render() {
    return (
      <Row className="container">
        <Col span="4" className="nav-left">
          <NavLeft />
        </Col>
        <Col span="20" className="main">
          <Header />
          <Row className="content">
            {/* <Home/> */}
            {this.props.children}
          </Row>
          <Footer />
        </Col>
      </Row>
    );
  }
}

export default Layout;
