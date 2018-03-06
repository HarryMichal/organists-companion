import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
  button: {
    'margin-left': 10,
    'margin-right': 10,
    height: 80,
    width: 170,
    'fontSize': '36px',
    'align-self': 'center',
  },
  buttonwrap: {
    'align-self': 'center'
  }
});

function WelcomeButtons(props) {
  const { classes } = props;
  
  return (
    <div className="welcome-buttons">
      <Link className={classes.buttonwrap} to={"/signup"}>
        <Button raised color="primary" className={classes.button} >
        Signup
        </Button>
      </Link>
      <Link className={classes.buttonwrap} to={"/login"}>
        <Button raised color="primary" className={classes.button} >
        Login
        </Button>
      </Link>
    </div>
  )
}

export default withStyles(styles)(WelcomeButtons);
