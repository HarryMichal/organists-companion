import React from 'react';
import {Link} from 'react-router-dom';

import ResponsiveDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';

class MockupPage extends React.Component {
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      title: 'Mockup'
    }
  };
  
  render() {
    return (
    <div className='page-parent'>
      <header className='header'>
        <ResponsiveDrawer title={this.state.title}/>
      </header>
      <div className='container-full'>
      </div>
    </div>
    )
  }
}

export default MockupPage;
