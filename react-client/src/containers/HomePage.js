import React from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';

import ResponsiveDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';
import WelcomeButtons from '../components/Buttons/WelcomeButtons';

import SignUpPage from './SignUpPage';

class HomePage extends React.Component {
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
      this.props.history.push("/auth/" + event.target.value);
  }
  
  render() {
    return (
    <div className='page-parent'>
      <header className='navbar'>
        <ResponsiveDrawer title={this.state.title}/>
      </header>
      <div className='container-full'>
        <div className='container-center'>
          <WelcomeButtons onClick={this.changeForm} />
        </div>
      </div>
    </div>
    )
  }
}

export default HomePage;
