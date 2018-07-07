import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: 500,
    height: 160
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10
  },
  subheading: {
    paddingBottom: 10
  },
  button: {
    width: 150,
    height: 60,
    fontSize: "30px"
  }
})

class ErrorForm extends React.Component {
  
  
  render() {
    const { classes, onClick } = this.props;
    
    return (
      <Grid container justify='center' alignItems='center' spacing='16'>
        <Grid item >
          <Paper elevation={3} className={classes.root}>
            <Typography variant='title' align='center' className={classes.title}>
              There was an error while connecting to the server.
            </Typography>
            <Typography variant='subheading' align='center' className={classes.subheading}>
              Click this button to try to connect again.
            </Typography>
            <Button variant='raised' size='large' color='primary' onClick={onClick} className={classes.button}>
              Connect
            </Button>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

ErrorForm.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(ErrorForm);
