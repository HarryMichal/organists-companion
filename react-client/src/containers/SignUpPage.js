import React from 'react';
import fetch from 'node-fetch';

import AppBar from '../components/AppBar/AppBar';
import SignUpForm from '../components/Forms/SignUpForm';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      title: 'SignUp',
      errors: {},
      user: {
        username: '',
        email: '',
        password: ''
      },
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
    e.preventDefault(); // prevent default behaviour
    var user = this.state.user;
    fetch('http://localhost:3000/api/signup', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(json => console.log(json));
  };

  render() {
    return (
          <div className="container-form">
            <SignUpForm onSubmit={this.processForm} onChange={this.changeUser} errors={this.state.errors} user={this.state.user}/>
          </div>
    );
  }
}

export default SignUpPage;
