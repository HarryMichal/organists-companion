import React from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';

import ResponsiveDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';
import WelcomeButtons from '../components/Buttons/WelcomeButtons';

import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';

class notAuthorizedApp extends React.Component {
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      title: 'Home',
      form: 'login'
    }
    this.changeForm = this.changeForm.bind(this);
    console.log(localStorage.getItem('jwt'));
  };
  
  changeForm(event) {
    this.setState({ form: event.target.value });
  }
  
  render() {
    return (
    <div className='page-parent'>
      <header className='navbar'>
        <ResponsiveDrawer title={this.state.title}/>
      </header>
      <div className='container-full'>
        <WelcomeButtons onClick={this.changeForm} />
        { this.state.form === 'login'
        ?  <LoginPage />
        :  <SignUpPage />
        }
      </div>
    </div>
    )
  }
}

export default notAuthorizedApp;
