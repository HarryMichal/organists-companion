import React from 'react';
import fetch from 'node-fetch';
import { replace } from 'lodash';

import ResponsiveBar from '../components/ResponsiveDrawer/ResponsiveDrawer';
import LoginForm from '../components/Forms/LoginForm';
import SignUpForm from '../components/Forms/SignUpForm';
import WelcomeButtons from '../components/Buttons/WelcomeButtons';

import AuthService from '../services/AuthService';
import constants from '../constants.js';

class AuthPage extends React.Component {
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
  
  componentDidMount() {
    this.renderForm(this.props);
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.authType !== this.props.match.params.authType) {
      this.renderForm(nextProps);
    }
  }
  
  getRequestURL() {
    let requestURL;
    
    switch (this.props.match.params.authType) {
      case 'login':
        requestURL = 'http://localhost:3000/api/login';
        break;
      case 'register':
        requestURL = 'http://localhost:3000/api/register';
        break;
    }
    return requestURL;
  };
  
  changeUser(event) {
    const field = event.target.id;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({user});
  };
  
  changeForm() {
    this.props.history.push("/auth/");
  }

  processForm(event) { // send to API and handle client authentication
    event.preventDefault();
    const user = this.state.user;
    const requestURL = this.getRequestURL();
    AuthService.login(user);
  };
  
  renderForm() {
    if (this.props.match.params.authType === 'login') {
      return (
          <LoginForm onSubmit={this.processForm} onChange={this.changeUser} errors={this.state.errors} user={this.state.user} />
      );
    }
    else if (this.props.match.params.authType === 'register') {
      return (
          <SignUpForm onSubmit={this.processForm} onChange={this.changeUser} errors={this.state.errors} user={this.state.user}/>
      );
    };
  };
  
  render() {
    return (
      <div className='page-parent'>
        <header className='navbar'>
          <ResponsiveBar title={this.state.title}/>
        </header>
        <WelcomeButtons onClick={this.changeForm} />
        <div className="container-form">
          {this.renderForm()}
        </div>
      </div>
    );
  };
};

export default AuthPage;
