import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home/home';
import LoginPage from './components/LoginPage';
import LoginForm from './components/LoginForm/LoginForm';
import Register from './components/register';
import Man_user from './components/manage_user';
import Man_ter from './components/manage_terminal';
import Media from './components/media';
import Newuser from './components/newuser';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './App.scss';

moment.locale('zh-cn');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={LoginPage} />
          <Route path="/home/index" component={Home} />
          <Route path="/home/user/index" component={Man_user} />
          <Route path="/home/user/update" component={Newuser} />
          <Route path="/home/ter" component={Man_ter} />
          <Route path="/home/media" component={Media} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
