import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
  button: {
    margin: 12,
    height: 40,
    "align-self": "center",
  },
});

function WelcomeButtons(props) {
  const { classes } = props;
  
  return (
    <div className="welcome-buttons">
      <Link to={"/signup"}>
        <Button raised color="primary" className={classes.button} >
        Signup
        </Button>
      </Link>
      <Link to={"/login"}>
        <Button raised color="primary" href="/login" className={classes.button} >
        Login
        </Button>
      </Link>
    </div>
  )
}

export default withStyles(styles)(WelcomeButtons);
