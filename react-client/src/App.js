import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.css';

import AuthService from './services/AuthService';

import CircularProgress from '@material-ui/core/CircularProgress';

// =====================================================

const Loading = () => <div>Loading...</div>

const Components = {
  Home: Loadable({
    loader: () => import('./containers/HomePage'),
    loading: Loading
  }),
  Output: Loadable({
    loader: () => import('./containers/OutputPage'),
    loading: Loading
  }),
  Dialer: Loadable({
    loader: () => import('./containers/DialerPage'),
    loading: Loading
  }),
  Catalog: Loadable({
    loader: () => import('./containers/CatalogPage'),
    loading: Loading
  })
}

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
            <Route exact path="/" component={Components.Home}/>
            <Route exact path="/output" component={Components.Output}/>
            <Route exact path="/catalog" component={Components.Catalog}/>
            <PrivateRoute exact path="/app" component={Components.Dialer}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
