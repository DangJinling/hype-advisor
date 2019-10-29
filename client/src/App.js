import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Scrollex from './components/hypeAdvisor/Scrollex';
import Login from './components/hypeAdvisor/Login';
import Register from './components/hypeAdvisor/Register';
import Agreement from './components/hypeAdvisor/Agreement';
import Welcome from './components/hypeAdvisor/Welcome';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MainLayout from './components/hypeAdvisor/MainLayout';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <MainLayout>
            <Switch>
              <Route exact path='/' component={Scrollex} />
              <Route exact path='/story' component={Scrollex} />
              <Route exact path='/service' component={Scrollex} />
              <Route exact path='/industry' component={Scrollex} />
              <Route exact path='/why' component={Scrollex} />
              <Route exact path='/form' component={Scrollex} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/agreement' component={Agreement} />
              <Route exact path='/welcome' component={Welcome} />
            </Switch>
          </MainLayout>
        </Router>
      </Provider>
    )
  }
}

export default App

