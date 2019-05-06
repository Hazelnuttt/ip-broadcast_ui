import React from 'react';
import { Row, Col, Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import './index.scss';
import { connect } from 'react-redux';

class Header extends React.Component {
  state = {};
  componentWillMount() {
    this.setState({
      username: 'wly'
    });
  }

  render() {
    return (
      <div className="header">
        <Row>
          <Row className="header-top">
            <Col span={24}>
              <span>欢迎，{this.state.username}</span>
              <NavLink to="/login" className={'layout'}>
                退出
              </NavLink>
            </Col>
          </Row>
          <Row className="breadcrumb">
            <Col span="4" className="breadcrumb-title">
              {this.props.menuName}
            </Col>
          </Row>
        </Row>
      </div>
    );
  }
}

//header里用来获取值的
//connect 里会接受一个回调方法
// 这个state是数据源的状态，是store里面定义的一些值
// 这个menuName 保存下来之后，会自动储存在属性里边
const mapStateToProps = state => {
  return {
    menuName: state.menuName
  };
};
export default connect(mapStateToProps)(Header);
