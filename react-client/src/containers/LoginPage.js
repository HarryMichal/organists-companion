import React from 'react';

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
  Process the form
  */
  processForm(event) {
    // prevent default action
    event.preventDefault();
    console.log('username: ', this.state.user.username);
    console.log('password: ', this.state.user.password);
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
  Render the component
  */
  render() {
    return (<div className="container">
      <div className="header">
      <AppBar title={this.state.title}/>
      </div>
      <div className="body">
    <LoginForm onSubmit={this.processForm} onChange={this.changeUser} errors={this.state.errors} user={this.state.user}/>
    </div>
  </div>);
  }

}
export default LoginPage;
