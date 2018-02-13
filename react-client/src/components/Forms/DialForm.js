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
    width: 800,
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
    fontSize: 60
  },
  button: {
    minWidth: 20,
    width: "100%",
    height: "100%",
    "fontSize": "40px",
  },
  root: {
    flexGrow: 1,
  }
});
  
class DialForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spacing: "24",
      itemspacing: "2"
    }
  };
  
  render() {
    const { classes, onSubmit, onChange, onClick, data } = this.props;
    
    return (
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.xxx} onSubmit={onSubmit}>
            <div className={classes.root}>
              <Grid container justify="center" spacing={this.state.spacing} >
                <Grid item xs="12">
                  <TextField disabled id="number" className={classes.textField} value={data.number} onChange={onChange} />
                </Grid>
                <Grid item xs={this.state.itemspacing}>
                  <Button raised className={classes.button} id="number" value="1" type="submit" color="primary" onClick={onClick}>
                  1
                  </Button>
                </Grid>
                <Grid item xs={this.state.itemspacing}>
                  <Button raised className={classes.button} id="number" value="2" type="submit" color="primary" onClick={onClick}>
                  2
                  </Button>
                </Grid>
                <Grid item xs={this.state.itemspacing}>
                  <Button raised className={classes.button} id="number" value="3" type="submit" color="primary" onClick={onClick}>
                  3
                  </Button>
                </Grid>
                <Grid item xs={this.state.itemspacing}>
                  <Button raised className={classes.button} id="number" value="4" type="submit" color="primary" onClick={onClick}>
                  4
                  </Button>
                </Grid>
                <Grid item xs={this.state.itemspacing}>
                  <Button raised className={classes.button} id="number" value="5" type="submit" color="primary" onClick={onClick}>
                  5
                  </Button>
                </Grid>
                <Grid item xs={this.state.itemspacing}>
                  <Button raised className={classes.button} id="number" value="6" type="submit" color="primary" onClick={onClick}>
                  6
                  </Button>
                </Grid>
                <Grid item xs={this.state.itemspacing}>
                  <Button raised className={classes.button} id="number" value="7" type="submit" color="primary" onClick={onClick}>
                  7
                  </Button>
                </Grid>
                <Grid item xs={this.state.itemspacing}>
                  <Button raised className={classes.button} id="number" value="8" type="submit" color="primary" onClick={onClick}>
                  8
                  </Button>
                </Grid>
                <Grid item xs={this.state.itemspacing}>
                  <Button raised className={classes.button} id="number" value="9" type="submit" color="primary" onClick={onClick}>
                  9
                  </Button>
                </Grid>
                <Grid item xs={this.state.itemspacing}>
                  <Button raised className={classes.button} id="number" value="*" type="submit" color="primary" onClick={onClick}>
                  *
                  </Button>
                </Grid>
                <Grid item xs={this.state.itemspacing}>
                  <Button raised className={classes.button} id="number" value="0" type="submit" color="primary" onClick={onClick}>
                  0
                  </Button>
                </Grid>
                <Grid item xs={this.state.itemspacing}>
                  <Button raised className={classes.button} id="number" value="#" color="primary" onClick={onClick}>
                  #
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  };
};

DialForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  data: PropTypes.func.isRequired
};
    
export default withStyles(styles)(DialForm);
