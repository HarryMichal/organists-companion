import React from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';

import ResponsiveDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';
import WelcomeButtons from '../components/Buttons/WelcomeButtons';

import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      title: 'Home',
      selectedform: 'Login',
    }
  };
  
  render() {
    return (
    <div className='page-parent'>
      <header className='header'>
        <ResponsiveDrawer title={this.state.title}/>
      </header>
      <div className='container-full'>
        <WelcomeButtons />
        {this.state.selectedform == 'Login'
        ? <Switch>
            <Route path='/login' component={LoginPage}/>
          </Switch>
        : <Switch>
            <Route path='/signup' component={SignUpPage}/>
          </Switch>}
      </div>
    </div>
    )
  }
}

export default HomePage;
