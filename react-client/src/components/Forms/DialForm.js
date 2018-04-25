import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Card, { CardText, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  card: {
    minWidth: 270,
    width: 500,
    height: "fit-content",
    "align-self": "center",
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  form: {
    
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 0,
    marginBottom: 30,
    width: "auto",
    fontSize: 60
  },
  textField: {
    fontSize: 50,
    root: {
      fontSize: '50px'
    },
    input: {
      fontSize: '50px'
    },
    hint: {
      fontSize: '50px'
    }
  },
  button: {
    minWidth: 20,
    width: "100%",
    height: "100%",
    fontSize: "40px",
  },
  root: {
    flexGrow: 1,
  }
});
  
class DialForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spacing: "8",
      xs: "4"
    }
  };
  
  renderButtons() {
    const { classes, onClick } = this.props;
    
    return (
      <Grid container spacing={this.state.spacing}>
        <Grid item xs={this.state.xs}>
          <Button raised className={classes.button} id="number" value="1" color="primary" onClick={onClick}>
          1
          </Button>
        </Grid>
        <Grid item xs={this.state.xs}>
          <Button raised className={classes.button} id="number" value="2" color="primary" onClick={onClick}>
          2
          </Button>
        </Grid>
        <Grid item xs={this.state.xs}>
          <Button raised className={classes.button} id="number" value="3" color="primary" onClick={onClick}>
          3
          </Button>
        </Grid>
        <Grid item xs={this.state.xs}>
          <Button raised className={classes.button} id="number" value="4" color="primary" onClick={onClick}>
          4
          </Button>
        </Grid>
        <Grid item xs={this.state.xs}>
          <Button raised className={classes.button} id="number" value="5" color="primary" onClick={onClick}>
          5
          </Button>
        </Grid>
        <Grid item xs={this.state.xs}>
          <Button raised className={classes.button} id="number" value="6" color="primary" onClick={onClick}>
          6
          </Button>
        </Grid>
        <Grid item xs={this.state.xs}>
          <Button raised className={classes.button} id="number" value="7" color="primary" onClick={onClick}>
          7
          </Button>
        </Grid>
        <Grid item xs={this.state.xs}>
          <Button raised className={classes.button} id="number" value="8" color="primary" onClick={onClick}>
          8
          </Button>
        </Grid>
        <Grid item xs={this.state.xs}>
          <Button raised className={classes.button} id="number" value="9" color="primary" onClick={onClick}>
          9
          </Button>
        </Grid>
        <Grid item xs={this.state.xs}>
          <Button raised className={classes.button} id="init_song" value="song" color="secondary" onClick={onClick}>
          *
          </Button>
        </Grid>
        <Grid item xs={this.state.xs}>
          <Button raised className={classes.button} id="number" value="0" color="primary" onClick={onClick}>
          0
          </Button>
        </Grid>
        <Grid item xs={this.state.xs}>
          <Button raised className={classes.button} id="init_psalm" value="psalm" color="secondary" onClick={onClick}>
          #
          </Button>
        </Grid>
      </Grid>
    );
  }
  
  render() {
    const { classes, onClick, onChange, onSubmit, data } = this.props;
    
    return (
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.form} onSubmit={onSubmit}>
            <div className={classes.root}>
              <Grid container justify="center" spacing={this.state.spacing} >
                <Grid item xs>
                  <TextField disabled id="number" className={classes.textField} value={this.props.data.number} onChange={onChange} />
                </Grid>
                <Grid item xs="4">
                  <Button raised className={classes.button} id="backspace" onClick={onClick}>
                  DEL
                  </Button>
                </Grid>
              </Grid>
                {this.renderButtons()}
            </div>
          </form>
        </CardContent>
      </Card>
    )
  };
};

DialForm.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.func.isRequired
};
    
export default withStyles(styles)(DialForm);
