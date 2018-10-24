import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.css';

import AuthService from './services/AuthService';

import CircularProgress from '@material-ui/core/CircularProgress';

// =====================================================

const Loading = (props) => {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  }
  else if (props.timedOut) {
    return <div>Taking a long time... <button onClick={ props.retry }>Retry</button></div>;
  }
  else if (props.pastDelay) {
    return <div>Loading...</div>;
  }
  else {
    return null;
  }
}
  

const Components = {
  Home: Loadable({
    loader: () => import('./containers/HomePage'),
    loading: Loading,
    timeout: 10000, // 10 seconds
  }),
  Output: Loadable({
    loader: () => import('./containers/OutputPage'),
    loading: Loading,
    timeout: 10000, // 10 seconds
  }),
  Dialer: Loadable({
    loader: () => import('./containers/DialerPage'),
    loading: Loading,
    timeout: 10000, // 10 seconds
  }),
  Psalms: Loadable({
    loader: () => import('./containers/PsalmsPage'),
    loading: Loading,
    timeout: 10000, // 10 seconds
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
            <Route exact path="/psalms" component={Components.Psalms}/>
            <PrivateRoute exact path="/app" component={Components.Dialer}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
