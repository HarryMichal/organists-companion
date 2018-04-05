import React from 'react';
import fetch from 'node-fetch';

import ResponsiveBar from '../components/ResponsiveDrawer/ResponsiveDrawer';
import LoginForm from '../components/Forms/LoginForm';

import AuthService from '../services/AuthService';
import constants from '../constants.js';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      title: 'Login',
      errors: {},
      user: {
        username: '',
        password: ''
      }
    };
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  };
  
  changeUser(event) {
    const field = event.target.id;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({user});
  };

  processForm(e) { // send to API and handle client authentication
    e.preventDefault();
    var user = this.state.user;
    AuthService.login(user);
  };

  render() {
    return (
          <div className="container-form">
            <LoginForm onSubmit={this.processForm} onChange={this.changeUser} errors={this.state.errors} user={this.state.user} />
            <p>{constants.auth.token}</p>
          </div>
    );
  };
};

export default LoginPage;
