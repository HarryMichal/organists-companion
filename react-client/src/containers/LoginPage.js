import React from 'react';
import fetch from 'node-fetch';

import ResponsiveBar from '../components/ResponsiveDrawer/ResponsiveDrawer';
import LoginForm from '../components/Forms/LoginForm';

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
      },
      message: '',
      isAuthenticated: false,
    };
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  };
  
  changeUser(event) {
    const field = event.target.id;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({user});
  }

  processForm(e) {
    e.preventDefault(); // prevent default action
    var user = this.state.user;
    fetch('http://localhost:3000/api/login', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    .then(json => this.setState({isAuthenticated: json.authenticated}));
  };

  render() {
    return (
      <div className='page-parent'>
        <header className='header'>
          <ResponsiveBar title={this.state.authenticated ? "yes" : "no"} />
        </header>
        <div className='container-full'>
          <div className='container-form'>
            <LoginForm onSubmit={this.processForm} onChange={this.changeUser} errors={this.state.errors} user={this.state.user} />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
