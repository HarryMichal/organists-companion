import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

const styles = theme => ({
  card: {
    minWidth: 270,
    width: 350,
    height: "fit-content",
    "align-self": "center",
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    fontSize: 40,
    height: 50,
    border: "1px solid #000"
  },
  button: {
    minWidth: 20,
    width: "100%",
    height: "100%",
    fontSize: "34px",
  },
  buttonwrap: {
    marginTop: 15
  },
  root: {
    flexGrow: 1,
  }
});
  
class DialForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spacing: 8,
      xs: 4
    }
  };
  
  renderButtons() {
    const { classes, onClick } = this.props;
    
    return (
      <Grid container spacing={this.state.spacing} className={classes.buttonwrap}>
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
    const { classes, onClick, onSubmit, data } = this.props;
    
    return (
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.form} onSubmit={onSubmit}>
            <div className={classes.root}>
              <Grid container justify="center" alignItems='center' spacing={this.state.spacing} >
                <Grid item xs>
                  <p id="number" className={classes.textField}>
                  {data.number}
                  </p>
                </Grid>
                <Grid item xs={this.state.xs}>
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
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};
    
export default withStyles(styles)(DialForm);
