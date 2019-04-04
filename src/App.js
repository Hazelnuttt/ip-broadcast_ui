import React from 'react';
import {
  HashRouter,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from './components/home/home';
import LoginPage from './components/loginpage';
import Login from './components/login';
import Register from './components/register';
import './App.css';
import Man_user from './components/manage_user';
import Man_ter from './components/manage_terminal';
import Media from './components/media';
import Newuser from './components/newuser';
//import {user, ter, media} from './components/page.js';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div style={{ height: '100%' }}>
          {/* <Switch> */}
          <Route exact path="/" component={LoginPage} />
          {/* <Route path="/home/index" component={Four} /> */}
          <Route path="/home/user/index" component={Man_user} />
          <Route path="/home/user/update" component={Newuser} />
          <Route path="/home/ter" component={Man_ter} />
          <Route path="/home/media" component={Media} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {/* </Switch> */}
        </div>
      </Router>
    );
  }
}

export default App;

// <HashRouter>
