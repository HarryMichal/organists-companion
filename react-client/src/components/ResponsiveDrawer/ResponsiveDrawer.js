import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DialpadIcon from '@material-ui/icons/Dialpad';
import VisibilityIcon from '@material-ui/icons/Visibility';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: 65,
    marginTop: 0,
    zIndex: 1,
    overflow: 'hidden',
    display: 'flex',
  },
  appBar: {
    position: 'fixed',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    width: 250,
    height: "100%",
  },
  headerTitle: {
    'text-align': 'center'
  },
  titleCenter: {
    'text-align': 'center',
  },
  titleRight: {
    textAlign: 'right'
  }
});

class AppDrawer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
    };
    
    this.renderRightButton = this.renderRightButton.bind(this);
  };

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };
  
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  
  handleMenuClose = () => {
   this.setState({ anchorEl: null });
  };
  
  renderRightButton() {
    const { classes, status, onClick } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    
    let onClickNew = (event) => {
      onClick(event);
      this.handleMenuClose();
    }
    
    if (status) {
      if (status.isLoggedIn && status.isConnected && !status.isError) {
        return (
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleMenuClose}
            >
              <MenuItem id="reconnect" onClick={onClickNew}>Reconnect</MenuItem>
              <MenuItem id="relogin" onClick={onClickNew}>Relogin</MenuItem>
            </Menu>
          </div>
        )
      }
      else if (!status.isLoggedIn) {
        return (
          <Button variant='raised' size='medium' color='primary' id='relogin' onClick={onClick} className={classes.button}>
            Login
          </Button>
        )
      }
      else if (!status.isConnected) {
        return (
          <Button variant='raised' size='medium' color='primary' id='reconnect' onClick={onClick} className={classes.button}>
            Reconnect
          </Button>
        )
      }
    }
  }

  renderMiddleText() {
    const { classes, status } = this.props;

    if (!status && this.props.title) {
      return(
        <Typography
          style={status ? { 'flex': 1, width: 'auto' } : { width: '100%', paddingRight: 35 }}
          className={classes.titleCenter}
          variant={status ? "subheading" : "title"}
          color="inherit"
        >
          {this.props.title}
        </Typography>
      )
    }
    else if (status) {
      return(
        <Typography
          style={status.isConnected ? { color: 'green' } : { color: 'red' }}
          className={classes.titleCenter}
          variant="title"
          color="inherit"
        >
          {status.isConnected ? "Connected" : "Disconnected"}
        </Typography>
      )
    }
  }

  render() {
    const { classes, theme, status } = this.props;

    const drawer = (
      <div>
        <div className={classes.drawerHeader}>
          <Typography variant='title' style={{'flex': 1, width: 'auto'}} className={classes.headerTitle}>Organist's Companion</Typography>
        </div>
        <Divider />
        <List component="nav">
          <div>
            <ListItem button component="a" href="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            
            <ListItem button component="a" href="/output">
              <ListItemIcon>
                <VisibilityIcon />
              </ListItemIcon>
              <ListItemText primary="Output"/>
            </ListItem>
            
            <Divider />
            
            <ListItem button component="a" href="/app">
              <ListItemIcon>
                <DialpadIcon />
              </ListItemIcon>
              <ListItemText primary="Dialer"/>
            </ListItem>
          </div>
        </List>
      </div>
    );



    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            
            {this.renderMiddleText()}

            <Typography
              style={status ? {'flex': 1, width: 'auto'} : {width: '100%', paddingRight: 35} }
              className={classes.titleCenter}
              variant={status ? "subheading" : "title"}
              color="inherit"
            >
              {this.props.title}
            </Typography>
            
            {(status &&
              <div className={classes.titleRight}>
                {this.renderRightButton()}
              </div>
            )}
          </Toolbar>
        </AppBar>
          <Drawer
            variant="temporary"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.open}
            onClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            >
            {drawer}
          </Drawer>
      </div>
    );
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  onClick: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AppDrawer);
