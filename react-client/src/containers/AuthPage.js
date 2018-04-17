import React from 'react';
import { withRouter } from 'react-router';
import fetch from 'node-fetch';
import { replace } from 'lodash';

import ResponsiveBar from '../components/ResponsiveDrawer/ResponsiveDrawer';
import LoginForm from '../components/Forms/LoginForm';
import SignUpForm from '../components/Forms/SignUpForm';
import WelcomeButtons from '../components/Buttons/WelcomeButtons';

import AuthService from '../services/AuthService';

class AuthPage extends React.Component {
  constructor(props) {
    super();
    // set the initial component state
    this.state = {
      title: 'Authentication',
      errors: {},
      user: {
        username: '',
        email: '',
        password: ''
      }
    };
    this.changeForm = this.changeForm.bind(this);
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
        requestURL = 'http://192.168.0.109:3000/api/login';
        break;
      case 'signup':
        requestURL = 'http://192.168.0.109:3000/api/register';
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
  
  changeForm(event) {
    this.props.history.push("/auth/" + event.target.value);
  }

  processForm(event) { // send to API and handle client authentication
    event.preventDefault();
    const user = this.state.user;
    const requestURL = this.getRequestURL();
    switch (this.props.match.params.authType) {
      case 'login':
        fetch(requestURL, {
          method: 'post',
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json"
          }})
          .then(res => res.json())
          .then(json => {
            let jwt = json;
            AuthService.setToken(jwt);
            this.props.history.push("/app");
          }).catch((err) => {
            console.log(err);
          });
        break;
      case 'signup':
        fetch(requestURL, {
          method: 'post',
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json"
          }})
          .then(res => res.json())
          .then(json => {
            console.log(json);
          });
        break;
    };
  };
  
  renderForm() {
    if (this.props.match.params.authType === 'login') {
      return (
          <LoginForm onSubmit={this.processForm} onChange={this.changeUser} errors={this.state.errors} user={this.state.user} />
      );
    }
    else if (this.props.match.params.authType === 'signup') {
      return (
          <SignUpForm onSubmit={this.processForm} onChange={this.changeUser} errors={this.state.errors} user={this.state.user}/>
      );
    };
  };
  
  render() {
    return (
      <div className='page-parent'>
        <header className="navbar">
          <ResponsiveBar title={this.state.title}/>
        </header>
        <div className="container-full">
          <div className="container-center">
            <WelcomeButtons onClick={this.changeForm} />
            <div className="container-form">
              {this.renderForm()}
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default withRouter(AuthPage);
