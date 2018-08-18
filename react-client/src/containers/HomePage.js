import React from 'react';
import Grid from '@material-ui/core/Grid';

import AppDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';
import LoginForm from '../components/Forms/LoginForm';
import WelcomeButtons from '../components/Buttons/WelcomeButtons';

import AuthService from '../services/AuthService';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      title: 'Dialer',
      form: 'login',
      user: {
        username: '',
        email: '',
        password: ''
      }
    }
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  };
  
  getRequestURL() {
    let requestURL = 'http://90.178.223.199:50505/api/login';
    return requestURL;
  };
  
  changeUser(event) {
    const field = event.target.id;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({user});
  };
  
  processForm(event) { // send to API and handle client authentication
    event.preventDefault();
    const user = this.state.user;
    const requestURL = this.getRequestURL();
    
    fetch(requestURL, {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }}
    )
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        let token = json.token;
        AuthService.setToken(token);
        this.props.history.push("/app");
      }
    })
  };
  
  render() {
    return (
    <div className='page-parent'>
      <header className='navbar'>
        <AppDrawer title={this.state.title}/>
      </header>
      <Grid container justify='center' alignItems='center' className='container-full'>
        <Grid item className='container-center'>
          <LoginForm onSubmit={this.processForm} onChange={this.changeUser} errors={this.state.errors} user={this.state.user} />
        </Grid>
      </Grid>
    </div>
    )
  }
}

export default HomePage;
