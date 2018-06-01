import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  card: {
    minWidth: 270,
    width: 450,
    height: "fit-content",
    "align-self": "center",
    [theme.breakpoints.down('xs')]: {
      width: 350,
    },
    [theme.breakpoints.only('sm')]: {
      width: 450,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width: 500,
    },
    [theme.breakpoints.up('xl')]: {
      width: 800,
      height: 800,
    }
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
    [theme.breakpoints.down('xs')]: {
      fontSize: "26px",
    },
    [theme.breakpoints.only('sm')]: {
      fontSize: "32px"
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: "38px"
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: "44px"
    }
  },
  v_button: {
    minWidth: 20,
    width: "100%",
    height: "100%",
    fontSize: "24px"
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
      xs: 4,
      button: {
        number: [1,2,3,4,5,6,7,8,9],
        xs: 4,
      },
      v_buttons: {
        xs: 1.5,
      },
      init_song: false,
      init_psalm: false,
    }
    this.handleModeButtons = this.handleModeButtons.bind(this);
  };
  
  handleModeButtons(event) {
    const { onClick } = this.props;
    
    onClick(event);
    var song = this.state.init_song;
    var psalm = this.state.init_psalm;
    switch (event.target.id) {
      case("init_song"):
        if (!this.state.init_psalm)
          this.setState(prevState => ({ "init_song": !this.state.init_song}))
        break;
      case("init_psalm"):
        if (!this.state.init_song)
          this.setState(prevState => ({ "init_psalm": !this.state.init_psalm}))
        break;
    }
  }
  
  renderVerseButtons() {
    const { classes, data } = this.props;
    return(
      <Grid container justify='center' spacing={this.state.spacing} className={classes.buttonwrap}>
        {Array.from(data.verse).map((num) => (
          <Grid item xs={this.state.v_buttons.xs}>
            <Button variant="raised" className={classes.v_button} id="number" value={num} color="primary">
            {num}
            </Button>
          </Grid>
        )) }
      </Grid>
    )
  }
  
  renderButtons() {
    const { classes, onClick } = this.props;
    
    return (
      <Grid container justify='center' spacing={this.state.spacing} className={classes.buttonwrap}>
      {this.state.button.number.map((num) => (
        <Grid item xs={this.state.button.xs}>
          <Button variant="raised" className={classes.button} id="number" value={num} color="primary" onClick={onClick}>
          {num}
          </Button>
        </Grid>
      ))}
        
        <Grid item xs={this.state.button.xs}>
          <Button variant="raised" className={classes.button} id="init_song" value="song" color={!this.state.init_song ? ("secondary") : ("default")} onClick={this.handleModeButtons}>
          *
          </Button>
        </Grid>
        <Grid item xs={this.state.button.xs}>
          <Button variant="raised" className={classes.button} id="number" value="0" color="primary" onClick={onClick}>
          0
          </Button>
        </Grid>
        <Grid item xs={this.state.button.xs}>
          <Button variant="raised" className={classes.button} id="init_psalm" value="psalm" color={!this.state.init_psalm ? ("secondary") : ("default")} onClick={this.handleModeButtons}>
          #
          </Button>
        </Grid>
      </Grid>
    );
  }
  
  render() {
    const { classes, onClick, onSubmit, message } = this.props;
    
    return (
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.form} onSubmit={onSubmit}>
            <div className={classes.root}>
              <Grid container justify="center" alignItems='center' spacing={this.state.spacing} >
                <Grid item xs={this.state.xs}>
                  <Button variant="raised" className={classes.button} id="backspace" onClick={onClick}>
                  NULL
                  </Button>
                </Grid>
                <Grid item xs={this.state.xs}>
                  <p id="number" className={classes.textField}>
                  {message.number}
                  </p>
                </Grid>
                <Grid item xs={this.state.xs}>
                  <Button variant="raised" className={classes.button} id="backspace" onClick={onClick}>
                  DEL
                  </Button>
                </Grid>
              </Grid>
                {this.renderButtons()}
            </div>
          </form>
        </CardContent>
        <CardContent>
          {this.renderVerseButtons()}
        </CardContent>
      </Card>
    )
  };
};

DialForm.propTypes = {
  onClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired
};
    
export default withStyles(styles)(DialForm);
