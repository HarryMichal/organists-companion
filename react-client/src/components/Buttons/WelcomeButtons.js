import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

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
        <Button raised color="primary" href="/signup" className={classes.button} >
        Signup
        </Button>
      <Button raised color="primary" href="/login" className={classes.button} >
      Login
      </Button>
    </div>
  )
}

export default withStyles(styles)(WelcomeButtons);
