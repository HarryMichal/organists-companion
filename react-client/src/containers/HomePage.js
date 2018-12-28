import React from 'react';
import 'whatwg-fetch';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AppDrawer from '../components/AppBar/AppBar';
import EasyLoginForm from '../components/Forms/EasyLoginForm';

import AuthService from '../services/AuthService';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Dialer',
      user: {
        username: '',
        password: ''
      },
      formStatus: {
        requireLogin: false,
        error: false,
        wrongPassword: false,
        message: ''
      },
      betterLogin: false
    }
    this.onClickLogin = this.onClickLogin.bind(this);
    this.processForm = this.processForm.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  };
  
  componentDidMount() {
    AuthService.verifyToken("jwt", (valid, message) => {
      if (valid) {
        this.props.history.push('/app');
      }
    })
  }

  handleFormChange(event) {
    event.preventDefault();
    const field = event.target.id;
    const user = this.state.user;

    user[field] = event.target.value;
    this.setState(state => ({
      user: {
        username: state.user.username,
        password: user[field]
      }
    }));

    if (field === "password" && this.state.formStatus.wrongPassword) {
      this.setState(state => ({
        formStatus: {
          requireLogin: state.formStatus.requireLogin,
          error: state.formStatus.error,
          wrongPassword: false,
          message: ''
        }
      }));
    }
  };

  onClickLogin(event) {
    if (event.target.id === "back") {
      this.setState(state => ({
        user: {
          username: "",
          password: ""
        },
        formStatus: {
          requireLogin: false,
          error: state.formStatus.error,
          wrongUsername: state.formStatus.wrongUsername,
          wrongPassword: state.formStatus.wrongPassword,
          message: state.formStatus.message
        },
      }))
    }
    
    if ((event.target.id === "general" || "admin") && !this.state.formStatus.requireLogin) {
      const username = event.target.id
      this.setState(state => ({
        user: {
          username: username,
          password: state.user.password
        },
        formStatus: {
          requireLogin: true,
          error: state.formStatus.error,
          wrongUsername: state.formStatus.wrongUsername,
          wrongPassword: state.formStatus.wrongPassword,
          message: state.formStatus.message
        },
      }))
    }
  }
  
  // send to API and handle client authentication
  async processForm(event) {
    event.preventDefault();
    const user = this.state.user;

    if (this.state.betterLogin) {
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
    else {
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
  }

  handleServerResponse(json) {
    if (json.success) {
      let token = json.token;
      this.setState(state => ({
      formStatus: {
        requireLogin: state.formStatus.requireLogin,
        error: false,
        wrongUsername: false,
        wrongPassword: false,
        message: ''
        }
      }));
      AuthService.setToken(token);
      this.props.history.push("/app");
    }
    else {
      if (json.error) {
        this.setState(state => ({
          formStatus: {
            requireLogin: state.formStatus.requireLogin,
            error: true,
            wrongUsername: false,
            wrongPassword: false,
            message: json.message
          }
        }));
      } 
      else {
        if (json.wrongUsername) {
          this.setState(state => ({
            formStatus: {
              requireLogin: state.formStatus.requireLogin,
              error: false,
              wrongUsername: true,
              wrongPassword: false,
              message: json.message
            }
          }));
        }
        if (json.wrongPassword) {
          this.setState(state => ({
            formStatus: {
              requireLogin: state.formStatus.requireLogin, 
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
          <EasyLoginForm onSubmit={this.processForm} onChange={this.handleFormChange} onClick={this.onClickLogin} status={this.state.formStatus} user={this.state.user} />
        </Grid>
      </Grid>
    </div>
    )
  }
}

export default HomePage;
