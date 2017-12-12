import React from 'react';
import fetch from 'node-fetch';

import AppBar from '../components/AppBar/AppBar';
import LoginForm from '../components/Forms/LoginForm';

class LoginPage extends React.Component {
  /*
  Class constructor
  */
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
  }
  /*
  Change the user object
  */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({user});
  }

  /*
  Process the form
  */
  processForm(event) {
    event.preventDefault(); // prevent default action
    var user = this.state.user;

    fetch('/api/login', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(json => console.log(json));
  };

  /*
  Render the component
  */
  render() {
    return (<div className="container">
      <div className="header">
        <AppBar title={this.state.title}/>
      </div>
      <div className="body">
        <div className="container-form">
          <LoginForm onSubmit={this.processForm} onChange={this.changeUser} errors={this.state.errors} user={this.state.user}/>
        </div>
      </div>
    </div>);
  }

}
export default LoginPage;
