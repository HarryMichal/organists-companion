import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';

const drawerWidth = 240;

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

class ResponsiveDrawer extends React.Component {
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
            <Link to={"/login"}>
              <ListItem button>
                <ListItemText primary="Login" />
              </ListItem>
            </Link>
            <Link to={"/signup"}>
              <ListItem button>
                <ListItemText primary="Signup" />
              </ListItem>
            </Link>
            <Link to={"/app"}>
              <ListItem button>
                <ListItemText primary="Application"/>
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
              <Typography className={classes.navTitle} type="title" color="inherit" noWrap>
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

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
