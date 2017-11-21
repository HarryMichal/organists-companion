import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../content/logo.svg';
import '../stylesheets/App.css';

class base_layout extends Component {
  render() {
    return (
      <div className="root">
        <header className="header">
          <h1 className="title">Church Companion</h1>
          <img src={logo} className="logo" alt="logo" />
        </header>
        <div className="page-body">
        <p className="basic-paragraph">
        </p>
        </div>
        <footer className="footer">
        <h1 className="title">Footer</h1>
        </footer>
      </div>
    );
  };
};

export default base_layout;
