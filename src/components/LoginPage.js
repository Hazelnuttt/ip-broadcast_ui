import React from 'react';
import { Redirect } from 'react-router';

class LoginPage extends React.Component {
  render() {
    return <Redirect to="/login" />;
  }
}

export default LoginPage;
