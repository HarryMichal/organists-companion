import React from 'react';
import fetch from 'node-fetch';

import AppBar from '../components/AppBar/AppBar';
import SignUpForm from '../components/Forms/SignUpForm';

class SignUpPage extends React.Component {
  /*
  Class constructor
  */
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
      }
    };
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /*
  Change user - event handler
  */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({user});
  }

  /*
  Process the form - event handler
  */
  processForm(event) {
    event.preventDefault(); // prevent default behaviour
    var user = this.state.user;

    fetch('/api/signup', {
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
        <div className='appbar'>
          <AppBar title={this.state.title}/>
        </div>
      </div>

      <div className="body">
        <div className="container-form">
          <SignUpForm onSubmit={this.processForm} onChange={this.changeUser} errors={this.state.errors} user={this.state.user}/>
        </div>
      </div>
    </div>);
  }
}

export default SignUpPage;
