import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home'
import LoginPage from './components/loginpage'
import Login from './components/login'
import './App.css';

// import Router from './router/index.js'


class App extends React.Component{
  render(){
    return(
   <Router >
        <div style={{height:'100%'}}>
        <Switch>
          <Route exact path="/" component={LoginPage}/>
          <Route path="/home" component={Home}/>
          <Route path="/login" component={Login}/>
        </Switch>
        </div>
    </Router>
    )
  }
}



export default App;
