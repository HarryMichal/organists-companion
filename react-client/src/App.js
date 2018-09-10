import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import AuthService from './services/AuthService';

import HomePage from './containers/HomePage';
import DialerPage from './containers/DialerPage';
import AuthPage from './containers/AuthPage';
import OutputPage from './containers/OutputPage';

// =====================================================

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props =>
      AuthService.isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to='/auth/login' />
      )
  } />
)

const DisabledRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props =>
    <Redirect to='/' />
  } />
)

class App extends React.Component {
  
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <DisabledRoute exact path="/auth/:authType" component={AuthPage}/>
            <Route exact path="/output" component={OutputPage}/>
            <PrivateRoute exact path="/app" component={DialerPage}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;