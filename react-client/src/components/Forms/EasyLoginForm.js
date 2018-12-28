import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  card: {
    minWidth: "20em",
    margin: ".5em"
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    placeItems: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "10em",
  },
  icon: {
  },
  user: {
  },
  button: {

  }
})

class EasyLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          name: "User",
          group: "general"
        },
        {
          name: "Administrator",
          group: "admin"
        }
      ]
    }
  }

  renderLoginCard() {
    const { classes, onClick } = this.props;

    return(
      <div>
      {this.state.users.map((user) => (
        <Card elevation={3} className={classes.card}>
          <CardContent id={user.group} className={classes.cardContent} onClick={onClick}>
            <Avatar>
              <AccountCircleIcon className={classes.icon} />
            </Avatar>
            <h3 className={classes.user}>{user.name}</h3>
          </CardContent>
        </Card>
      ))}
      </div>
    )
  }

  renderLogin() {
    const { classes, status, user, onClick, onChange, onSubmit } = this.props;

    return(
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.userform} onSubmit={onSubmit}>
            <Typography variant="title">Enter password</Typography>
            <TextField error={status.wrongPassword} required id="password" label="Password" className={classes.textField} value={user.password} onChange={onChange} type="password" autoComplete="current-password" margin="normal" />
            <Button id="back" variant="contained" className={classes.button} color="primary" onClick={onClick}>
              Back
            </Button>
            <Button variant="contained" className={classes.button} type="submit" color="primary">
            Login
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }
    
  render() {
    const { status } = this.props;

    return(
      <div>
        {status.requireLogin ? this.renderLogin() : this.renderLoginCard()}
      </div>
    )
  }
}

EasyLoginForm.PropTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default withStyles(styles)(EasyLoginForm)