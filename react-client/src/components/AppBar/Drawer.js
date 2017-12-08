import React from 'react';
import {Link} from 'react-router-dom';

import Drawer_mui from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.props = {open: false};
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({open: !this.props.open});
  }

  handleClose() {
    this.props.handleClose();
  }

  render() {
    return (
      <div className="drawer">
      <Drawer_mui
        docked={false}
        className="app-drawer"
        width={300}
        open={this.props.open}
        onRequestChange={this.handleClose}
      >
        <MenuItem containerElement={<Link to="/" />} linkButton={true}>Home</MenuItem>
        <MenuItem containerElement={<Link to="/login" />} linkItem={true}>Login</MenuItem>
        <MenuItem containerElement={<Link to="/signup" />} linkItem={true}>SignUp</MenuItem>
      </Drawer_mui>
      </div>
    );
  }
}

export default Drawer;
