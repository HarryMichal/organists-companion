import React from 'react';
import 'whatwg-fetch';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AppDrawer from '../components/AppBar/AppBar';
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
      formStatus: {
        error: false,
        wrongUsername: false,
        wrongPassword: false,
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
    
    if (field === "username" && this.state.formStatus.wrongUsername) {
      this.setState(state => ({
        formStatus: {
          error: state.formStatus.error,
          wrongUsername: false,
          wrongPassword: state.formStatus.wrongPassword,
          message: ''
        }
      }));
    }

    if (field === "password" && this.state.formStatus.wrongPassword) {
      this.setState(state => ({
        formStatus: {
          error: state.formStatus.error,
          wrongUsername: state.formStatus.wrongUsername,
          wrongPassword: false,
          message: ''
        }
      }));
    }
  };
  
  async processForm(event) { // send to API and handle client authentication
    event.preventDefault();
    const user = this.state.user;
    
    let res = await fetch("/api/login", {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }}
    )
    let response = await res.json()

    this.handleServerResponse(response)
  }

  handleServerResponse(json) {
    console.log(json);
      if (json.success) {
        let token = json.token;
        this.setState(prevState => ({
        formStatus: {
            error: false,
          wrongUsername: false,
          wrongPassword: false,
            message: ''
          }
        }));
        AuthService.setToken(token);
        this.props.history.push("/app");
    } else {
      if (json.error) {
        this.setState(prevState => ({
          formStatus: {
            error: true,
            wrongUsername: false,
            wrongPassword: false,
            message: json.message
          }
        }));
      } else {
        if (json.wrongUsername) {
          this.setState(prevState => ({
            formStatus: {
              error: false,
              wrongUsername: true,
              wrongPassword: false,
              message: json.message
      }
          }));
        }
        if (json.wrongPassword) {
        this.setState(prevState => ({
            formStatus: {
              error: false,
              wrongUsername: false,
              wrongPassword: true,
            message: json.message
          }
        }));
      }
      }
    }
  }
  
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
          <LoginForm onSubmit={this.processForm} onChange={this.changeUser} status={this.state.formStatus} user={this.state.user} />
        </Grid>
      </Grid>
    </div>
    )
  }
}

export default HomePage;
