import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Link} from 'react-router-dom';
import Card, { CardText, CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  card: {
    minWidth: 270,
    width: 300,
    height: "fit-content",
    "align-self": "center"
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 0,
    marginBottom: 30,
    width: 250
  },
  menu: {
    width: 100
  },
  button: {
    marginBottom: 20
  }
});

class SignUpForm extends React.Component {
  render() {
    const { classes, onSubmit, onChange, user } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.userform} onSubmit={onSubmit} autoComplete="on">
            <TextField required="required" id="username" label="Username" className={classes.textField} value={user.username} onChange={onChange} margin="normal"/>
            <TextField required="required" id="email" label="Email" className={classes.textField} value={user.email} onChange={onChange}/>
            <TextField required="required" id="password" label="Password" className={classes.textField} value={user.password} onChange={onChange} type="password" margin="normal"/>
            <Button raised className={classes.button} type="submit" color="primary">
              Register
            </Button>
            <br></br>
            <Link to="/login">Already have an account?</Link>
          </form>
        </CardContent>
      </Card>
    );
  };
};

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUpForm);
