import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BookIcon from '@material-ui/icons/Book';
import NotesIcon from '@material-ui/icons/Notes';
import DeleteIcon from '@material-ui/icons/Delete';
import BackspaceIcon from '@material-ui/icons/Backspace';

const styles = theme => ({
  card: {
    height: "fit-content",
    [theme.breakpoints.up('xs')]: {
      width: "100%"
    },
    [theme.breakpoints.up('sm')]: {
      width: "420"
    },
    [theme.breakpoints.up('md')]: {
      width: 460
    },
    [theme.breakpoints.up('lg')]: {
      width: 500
    },
    [theme.breakpoints.up('xl')]: {
      width: 540
    },
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
    [theme.breakpoints.up('xs')]: {
      fontSize: '32px'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '38px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '42px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '46px'
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '50px'
    },
  },
  v_button: {
    minWidth: 30,
    width: "100%",
    height: "100%",
    [theme.breakpoints.up('xs')]: {
      fontSize: '24px'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '26px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '28px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '30px'
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '32px'
    },
  },
  buttonwrap: {
    marginTop: 15
  },
  root: {
    flexGrow: 1,
  },
  icon: {
    fontSize: 80
  },
  display1: {
    color: "grey"
  },
  display2: {
    color: "black"
  }
});
  
class DialForm extends React.PureComponent {
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
  };
  
  renderVerseButtons() {
    const { classes, data, onClick } = this.props;
    
    if (Array.from(data.verse).length === 0) {
      return null;
    }
    else {
      return(
        <Grid container justify='center' spacing={this.state.spacing} className={classes.buttonwrap}>
          {Array.from(data.verse).map((data) => (
            <Grid item xs={this.state.v_buttons.xs}>
              <Button disableRipple variant="raised" className={classes.v_button} id="verse" value={data[0]} color={data[1] ? ("secondary") : ("primary")} onClick={onClick}>
              {data[0]}
              </Button>
            </Grid>
          )) }
        </Grid>
      )
    }
  }
  
  renderButtons() {
    const { classes, onClick, message } = this.props;
    
    return (
      <Grid container justify='center' spacing={this.state.spacing} className={classes.buttonwrap}>
      {this.state.button.number.map((num) => (
        <Grid item xs={this.state.button.xs}>
          <Button disableRipple variant="raised" className={classes.button} id="number" value={num} color="primary" onClick={onClick}>
          {num}
          </Button>
        </Grid>
      ))}
        
        <Grid item xs={this.state.button.xs}>
          <Button disableRipple variant="raised" className={classes.button} id="init_song" value="song" color={message.type == "song" ? ("default") : ("secondary")} onClick={onClick}>
            <BookIcon />
          </Button>
        </Grid>
        <Grid item xs={this.state.button.xs}>
          <Button disableRipple variant="raised" className={classes.button} id="number" value="0" color="primary" onClick={onClick}>
          0
          </Button>
        </Grid>
        <Grid item xs={this.state.button.xs}>
          <Button disableRipple variant="raised" className={classes.button} id="init_psalm" value="psalm" color={message.type == "psalm" ? ("default") : ("secondary")} onClick={onClick}>
            <NotesIcon />
          </Button>
        </Grid>
      </Grid>
    );
  }
  
  render() {
    const { classes, onClick, onSubmit, message, data } = this.props;
    
    return (
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.form} onSubmit={onSubmit}>
            <div className={classes.root}>
              <Grid container justify="center" alignItems='center' spacing={this.state.spacing} >
                <Grid item xs={this.state.xs}>
                  <Button disableRipple variant="raised" color="secondary" className={classes.button} id="delete" onClick={onClick}>
                    <DeleteIcon />
                  </Button>
                </Grid>
                <Grid item xs={this.state.xs}>
                  {(((data.type == "psalm" || data.type == "song") && message.number == "") ?
                    <Typography classes={{ display1: classes.display1 }} variant="display1">
                    {data.number}
                    </Typography> :
                    <Typography classes={{ display2: classes.display2 }} variant="display2">
                    {message.number}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={this.state.xs}>
                  <Button disableRipple disableRipple variant="raised" className={classes.button} id="backspace" onClick={onClick}>
                    <BackspaceIcon />
                  </Button>
                </Grid>
              </Grid>
                {this.renderButtons()}
            </div>
          </form>
          {(data.type == "song" ? this.renderVerseButtons() : null)}
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
