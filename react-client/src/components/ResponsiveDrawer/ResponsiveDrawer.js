import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
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
=======
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
>>>>>>> d354be3d10c1e69966dbc6c9c99be3e0029d53bd
import MenuIcon from 'material-ui-icons/Menu';

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
  navTitle: {
    'align-self': 'center',
    'width': '100%',
    'margin-left': -40,
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
  };

  render() {
    const { classes, theme } = this.props;

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
              <Typography className={classes.navTitle} variant="title" color="inherit" noWrap>
                {this.props.title}
              </Typography>
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
};

export default withStyles(styles, { withTheme: true })(AppDrawer);
