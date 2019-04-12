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
import Man_ter from './components/terminal/manage_terminal';
import Man_info from './components/terminal/terminal_info';
import Newter from './components/terminal/newterminal';
import Single_edit from './components/terminal/single_edit';
import Batch_edit from './components/terminal/batch_edit';
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
          <Route path="/home/user/index" component={Man_user} />
          <Route path="/home/user/update" component={Newuser} />
          <Route path="/home/ter" component={Man_ter} />
          <Route path="/home/ter/ter_info" component={Man_info} />
          <Route path="/home/ter/add" component={Newter} />
          <Route path="/home/ter/edit_single" component={Single_edit} />
          <Route path="/home/ter/edit_batch" component={Batch_edit} />
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
