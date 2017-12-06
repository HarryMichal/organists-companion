import React from 'react';

import BigButton from '../components/BigButton';

class HomePage extends React.Component {
  render() {
    return (
    <div className="container">
      <BigButton href="/signup" label="SignUp"/>
      <BigButton href="/signup" label="SignUp"/>
      <BigButton href="/signup" label="SignUp"/>
    </div>)
  }
}

export default HomePage;
