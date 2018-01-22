import React from 'react';
import {Link} from 'react-router-dom';

import ResponsiveDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';
import WelcomeButtons from '../components/Buttons/WelcomeButtons';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      title: 'Home'
    }
  };
  
  render() {
    return (
    <div className='page-parent'>
      <header className='header'>
        <ResponsiveDrawer title={this.state.title}/>
      </header>
      <div className='container-full'>
        <WelcomeButtons/>
      </div>
    </div>
    )
  }
}

export default HomePage;
