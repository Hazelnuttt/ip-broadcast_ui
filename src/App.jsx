import React from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/home';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import LoginForm from './components/LoginForm/LoginForm';
// import Register from './components/register'
import User from './pages/user';
import Ter from './pages/terminal';
import Media from './components/media';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './App.scss';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
//数据源是要放入provider的组件里的
// 导入store 数据源
const store = configureStore();

moment.locale('zh-cn');

class App extends React.Component {
  render() {
    let LayoutRouter = (
      <Layout>
        <Switch>
          <Route path="/home/index" component={Home} />
          <Route path="/user/index" component={User} />
          <Route path="/ter/index" component={Ter} />
          <Redirect exact from="/home" to="/home/index" />
          <Redirect exact from="/user" to="/user/index" />
          <Redirect exact from="/ter" to="/ter/index" />
        </Switch>
      </Layout>
    );
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/login" component={LoginForm} />
              {/* <Route path="/register" component={Register} /> */}
              <Route path="/" render={props => LayoutRouter} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
