import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
    height: 65,
    marginTop: 0,
    zIndex: 2,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'fixed',
  },
  navIconHide: {
    marginLeft: -10,
    marginBottom: 5,
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    height: "100%",
  },
  titleCenter: {
    'align-self': 'center',
  },
  titleRight: {
    width: 200,
    textAlign: 'right'
  }
});

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  };

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
    
    console.log(this.props);
  };
  
  renderRightButton() {
    const { classes, status, onClick } = this.props;
    
    if (status) {
      if (status.isLoggedIn && !status.isError) {
        return (
          <Typography color="inherit" noWrap>
            Hello, dear user
          </Typography>
        )
      }
      else if (status.isLoggedIn && status.isError) {
        return (
          <Button variant='raised' size='medium' color='primary' onClick={onClick.reconnect} className={classes.button}>
            Reconnect
          </Button>
        )
      }
      else if (!status.isLoggedIn) {
        return (
          <Button variant='raised' size='medium' color='primary' onClick={onClick.login} className={classes.button}>
            Login
          </Button>
        )
      }
    }
  }

  render() {
    const { classes, theme, status } = this.props;

    const drawer = (
      <div>
        <div className={classes.drawerHeader} />
        <Divider />
        <List component="nav">
          <div>
            <Link to={"/"}>
              <ListItem button>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to={"/auth/login"}>
              <ListItem button>
                <ListItemText primary="Login" />
              </ListItem>
            </Link>
            <Link to={"/app"}>
              <ListItem button>
                <ListItemText primary="Dialer"/>
              </ListItem>
            </Link>
          </div>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
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
              <Typography style={status ? {'flex': 1, width: 'auto'} : {width: '100%', paddingRight: 35} } className={classes.titleCenter} variant="title" color="inherit" noWrap>
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
              type="temporary"
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
