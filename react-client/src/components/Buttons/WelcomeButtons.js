import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

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
  const { classes, onClick } = props;
  
  return (
    <div className="welcome-buttons">
      <Button raised color="primary" className={classes.button} onClick={onClick} value="login">
      Login
      </Button>
      <Button raised color="primary" className={classes.button} onClick={onClick} value="signup">
      Signup
      </Button>
    </div>
  );
};

WelcomeButtons.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default withStyles(styles)(WelcomeButtons);
