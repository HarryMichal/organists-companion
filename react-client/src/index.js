import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  browserHistory
} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

// Import CSS and favicon
import './stylesheets/App.css';
import logo from './content/logo.svg';

// Import containers
import App from './App';


ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
