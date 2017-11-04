import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/App.css';

class App extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    fetch('index')
  }

render() {
    return (
      <div className='Top'>
      <h1>Organists Companion</h1>
      </div>
    );
  }

}

export default App;
