import React from 'react';

import SignUpForm from '../components/RegisterForm';

class SignUpPage extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    // initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
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

    this.setState({
      user
    });
  }
  /*
  Process the form - event handler
  */
  processForm(event) {
    // prevent default behaviour
    event.preventDefault();

    console.log('name: ', this.state.user.name);
    console.log('email: ', this.state.user.email);
    console.log('password: ', this.state.user.email);
  }
  /*
  Render the component
  */
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

export default SignUpPage;
