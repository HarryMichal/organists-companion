import React from 'react';
import {Link} from 'react-router-dom';

import AppBar from '../components/AppBar/AppBar';
import BigButton from '../components/Buttons/WelcomeButtons';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      title: 'Home'
    }
  };
  render() {
    return (<div className="container">
      <div className="header">
        <div className='appbar'>
          <AppBar title={this.state.title}/>
        </div>
      </div>
      <div className='body'>
        <BigButton containerElement={<Link to = "/signup" />}/>
      </div>
    </div>)
  }
}

export default HomePage;
