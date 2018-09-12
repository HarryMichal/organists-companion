import React from 'react';
import 'whatwg-fetch';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AppDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';
import LoginForm from '../components/Forms/LoginForm';

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
      },
      response: {
        error: false,
        message: ''
      }
    }
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  };
  
  componentDidMount() {
    AuthService.verifyToken("jwt", (valid, message) => {
      if (valid) {
        this.props.history.push('/app');
      }
    })
  }

  changeUser(event) {
    const field = event.target.id;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({user});
  };
  
  processForm(event) { // send to API and handle client authentication
    event.preventDefault();
    const user = this.state.user;
    
    fetch("/api/login", {
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
        this.setState(prevState => ({
          response: {
            error: false,
            message: ''
          }
        }));
        AuthService.setToken(token);
        this.props.history.push("/app");
      }
      else if (json.error) {
        this.setState(prevState => ({
          response: {
            error: true,
            message: json.message
          }
        }));
      }
    })
  };
  
  render() {
    return (
    <div className='page-parent'>
      <header className='navbar'>
        <AppDrawer title={this.state.title}/>
      </header>
      <Grid container spacing={16} justify='center' alignItems='center' direction='column' className='container-full'>
        <Grid item>
          <Typography variant='display1' color='inherit'>Welcome to the Organist's companion.</Typography>
        </Grid>
        <Grid item className='container-center'>
          <LoginForm onSubmit={this.processForm} onChange={this.changeUser} response={this.state.response} user={this.state.user} />
        </Grid>
      </Grid>
    </div>
    )
  }
}

export default HomePage;
