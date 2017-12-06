import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppBar_mui from 'material-ui/AppBar';
import Drawer from './Drawer';

/**
 * A simple `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
export default class AppBar extends React.Component {

constructor() {
  super();
  this.state = {
    open: false
  }
  this.toggleDrawer = this.toggleDrawer.bind(this);
  this.handleClose = this.handleClose.bind(this);
}
//Toggle function (open/close Drawer)
toggleDrawer() {
  this.setState({
    open: !this.state.open
  })
}

handleClose() {
  this.setState({
    open: false
  })
}

render() {
  return (
    <div>
      <AppBar_mui onLeftIconButtonClick={this.toggleDrawer}/>
      <Drawer open={this.state.open} handleClose={this.handleClose} onToggleDrawer={this.toggleDrawer}/>
    </div>)
}
}
