import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Card, { CardText, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  card: {
    minWidth: 270,
    width: 300,
    height: "fit-content",
    "align-self": "center",
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 0,
    marginBottom: 30,
    width: 250,
  },
  menu: {
    width: 100,
  },
  button: {
    marginBottom: 20,
  },
});

class LoginForm extends React.Component {
  render() {
    const { classes, onSubmit, onChange, user } = this.props;
    
    return (
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.userform} onSubmit={onSubmit}>
            <TextField required id="username" label="Username" className={classes.textField} value={user.username} onChange={onChange} margin="normal" />
            <TextField required id="password" label="Password" className={classes.textField} value={user.password} onChange={onChange} type="password" autoComplete="current-password" margin="normal" />
            <Button raised className={classes.button} type="submit" color="primary">
            Login
            </Button>
            <br></br>
            <Link to="/signup">Don't have an account?</Link>
          </form>
        </CardContent>
      </Card>
    );
  };
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);
