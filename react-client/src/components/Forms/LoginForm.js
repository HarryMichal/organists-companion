import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    minWidth: 270,
    width: 320,
    height: "fit-content",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
  },
  button: {
    marginTop: 30,
  },
});

class LoginForm extends React.Component {
  showError() {
    if (this.props.response.error) {
      return(
        <Typography
          variant='body1'
          color='error'
        >
        {this.props.response.message}
        </Typography>
      )
    }
  }
  
  render() {
    const { classes, onSubmit, onChange, user } = this.props;
    
    return (
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.userform} onSubmit={onSubmit}>
            <Typography variant="title">Login</Typography>
            {this.showError()}
            <TextField required id="username" label="Username" className={classes.textField} value={user.username} onChange={onChange} margin="normal" />
            <TextField required id="password" label="Password" className={classes.textField} value={user.password} onChange={onChange} type="password" autoComplete="current-password" margin="normal" />
            <Button variant="contained" className={classes.button} type="submit" color="primary">
            Login
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  };
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  response: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);
