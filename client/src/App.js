import React, { Component } from 'react';
import './App.css';
import Scrollex from './components/hypeAdvisor/Scrollex';
import Login from './components/hypeAdvisor/Login';
import Register from './components/hypeAdvisor/Register';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

export class App extends Component {
  render() {
    return (
      // <div>
      //   <Scrollex />
      // </div>
      <Router>
        <Switch>
          <Route exact path='/' component={Scrollex} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </Router>
    )
  }
}

export default App

