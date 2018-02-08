import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Card, { CardText, CardContent } from 'material-ui/Card';

import ResponsiveDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';

const styles = theme => ({
  card: {
    minWidth: 400,
    width: 430,
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
    width: 350,
  },
  menu: {
    width: 200,
  },
  button: {
    marginBottom: 20,
  },
});

class MockupPage extends React.Component {
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      title: 'Mockup',
      "data": {
        "number": "",
        "psalmtext": "",
      },
      "temporary": ""
    }
    this.onMessage = this.onMessage.bind(this);
  };
  
  componentWillMount() {
    this.socket = new WebSocket("ws://localhost:3001/api/ws");
    this.socket.addEventListener("message", this.onMessage);
  }
  
  onMessage(e) {
    var data = JSON.parse(e.data);
    console.log(data);
    this.setState({"temporary": e.data});
    if (data.number) {
      this.setState({"data": {"number": data.number}})
    };
    
    if (data.psalmtext) {
      this.setState({"data": {"psalmtext": data.psalmtext}})
    };
  }
  
  handleMessage(e) {
    e.preventDefault();
  }
  
  componentWillUnmount() {
    this.socket.removeEventListener(this.onMessage);
    this.socket = null;
  }
  
  render() {
    const { classes } = this.props;
    
    return (
    <div className='page-parent'>
      <header className='header'>
        <ResponsiveDrawer title={this.state.title}/>
      </header>
      <div className='container-full'>
      <Card className={classes.card}>
        <CardContent>
            <TextField className={classes.textField} value={this.state.data.number} margin="normal" />
            <TextField className={classes.textField} value={this.state.data.psalmtext} margin="normal" />
            <TextField className={classes.textField} value={this.state.temporary} margin="normal" />
        </CardContent>
      </Card>
      </div>
    </div>
    )
  }
}

export default withStyles(styles)(MockupPage);
