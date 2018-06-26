import React from 'react';
import { withRouter } from 'react-router';
import fetch from 'node-fetch';
<<<<<<< HEAD
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AppDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';
=======
import Grid from 'material-ui/Grid';

import ResponsiveBar from '../components/ResponsiveDrawer/ResponsiveDrawer';
>>>>>>> d354be3d10c1e69966dbc6c9c99be3e0029d53bd
import LoginForm from '../components/Forms/LoginForm';
import SignUpForm from '../components/Forms/SignUpForm';
import WelcomeButtons from '../components/Buttons/WelcomeButtons';

import AuthService from '../services/AuthService';

<<<<<<< HEAD
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  
})

=======
>>>>>>> d354be3d10c1e69966dbc6c9c99be3e0029d53bd
class AuthPage extends React.Component {
  constructor(props) {
    super();
    // set the initial component state
    this.state = {
      title: 'Authentication',
      errors: {},
      user: {
        username: '',
        email: '',
        password: ''
      }
    };
    this.changeForm = this.changeForm.bind(this);
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  };
  
  componentDidMount() {
    this.renderForm(this.props);
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.authType !== this.props.match.params.authType) {
      this.renderForm(nextProps);
    }
  }
  
  getRequestURL() {
    let requestURL;
    
    switch (this.props.match.params.authType) {
      case 'login':
        requestURL = 'http://localhost:3000/api/login';
        break;
      case 'signup':
<<<<<<< HEAD
        requestURL = 'http://localhost:3000/api/signup';
=======
        requestURL = 'http://localhost:3000/api/register';
>>>>>>> d354be3d10c1e69966dbc6c9c99be3e0029d53bd
        break;
      default:
        console.log("Error.")
        break;
    }
    return requestURL;
  };
  
  changeUser(event) {
    const field = event.target.id;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({user});
  };
  
  changeForm(event) {
    this.props.history.push("/auth/" + event.target.value);
  }

  processForm(event) { // send to API and handle client authentication
    event.preventDefault();
    const user = this.state.user;
    const requestURL = this.getRequestURL();
    switch (this.props.match.params.authType) {
      case 'login':
        fetch(requestURL, {
          method: 'post',
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json"
          }}
        )
        .then(res => res.json())
        .then(json => {
          let jwt = json;
          AuthService.setToken(jwt);
          this.props.history.push("/app");
        }).catch((err) => {
          console.log(err);
        });
        break;
      case 'signup':
        fetch(requestURL, {
          method: 'post',
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json"
          }}
        )
        .then(res => res.json())
        .then(json => {
          console.log(json);
        });
        break;
      default:
        console.log("Error.")
        break;
    };
  };
  
  renderForm() {
    if (this.props.match.params.authType === 'login') {
      return (
          <LoginForm onSubmit={this.processForm} onChange={this.changeUser} errors={this.state.errors} user={this.state.user} />
      );
    }
    else if (this.props.match.params.authType === 'signup') {
      return (
          <SignUpForm onSubmit={this.processForm} onChange={this.changeUser} errors={this.state.errors} user={this.state.user}/>
      );
    };
  };
  
  render() {
<<<<<<< HEAD
    const { classes } = this.props;
    
    return (
      <Grid container className={classes.root} spacing={16}>
        <header className="navbar">
          <AppDrawer title={this.state.title}/>
        </header>
        <Grid container justify='center' alignItems='center' direction='column' spacing='16' className="container-full">
=======
    return (
      <div className='page-parent'>
        <header className="navbar">
          <ResponsiveBar title={this.state.title}/>
        </header>
        <Grid container justify='center' alignItems='center' direction='column' className="container-full">
>>>>>>> d354be3d10c1e69966dbc6c9c99be3e0029d53bd
          <Grid item className="container-center">
            <WelcomeButtons onClick={this.changeForm} />
          </Grid>
          <Grid item className="container-form">
              {this.renderForm()}
          </Grid>
        </Grid>
<<<<<<< HEAD
      </Grid>
=======
      </div>
>>>>>>> d354be3d10c1e69966dbc6c9c99be3e0029d53bd
    );
  };
};

<<<<<<< HEAD
export default withStyles(styles)(withRouter(AuthPage));
=======
export default withRouter(AuthPage);
>>>>>>> d354be3d10c1e69966dbc6c9c99be3e0029d53bd
