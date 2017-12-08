import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppBar_mui from 'material-ui/AppBar';
import Drawer from './Drawer';

const styles = {
  appbar: {
    height: 100,
  },
};

export default class AppBar extends React.Component {

constructor() {
  super();
  this.state = {
    open: false
  }
  this.props = {
    title: ""
  }
  this.toggleDrawer = this.toggleDrawer.bind(this);
  this.handleClose = this.handleClose.bind(this);
}
// Toggle function (open/close Drawer)
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
      <AppBar_mui title={this.props.title} style={styles.appbar} onLeftIconButtonClick={this.toggleDrawer}/>
      <Drawer open={this.state.open} handleClose={this.handleClose} onToggleDrawer={this.toggleDrawer}/>
    </div>)
}
}
