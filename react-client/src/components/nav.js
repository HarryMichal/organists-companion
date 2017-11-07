import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import './stylesheets/companion-CSS.css';

class Nav extends Component {
  render() {
    return(
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">"xxx"</Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
          <Link to="/">Home</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><button className="btn btn-info log">Log In</button></li>
          <li><button className="btn btn-danger log">Log out</button></li>
        </ul>
      </nav>
    );
  };
};

export default Nav;
