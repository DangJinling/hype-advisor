import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import routerConfig from './routerConfig';
import RouterGuard from './routerGuard';
export class App extends Component {
  render() {
    return (
      
        <Provider store={store}>
          <Router>
            <Switch>
                {
                  routerConfig.map((route, index) => {
                    return (
                        <Route key={index} exact path={route.path} render={props => (
                            <RouterGuard {...route} {...props} />
                        )}
                        />
                    )
                  })
                }
            </Switch>
          </Router>
        </Provider>
    )
  }
}

export default App

