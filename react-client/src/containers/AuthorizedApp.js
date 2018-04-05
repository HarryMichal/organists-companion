import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Card, { CardText, CardContent } from 'material-ui/Card';

import ResponsiveDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';
import DialForm from '../components/Forms/DialForm';

const styles = theme => ({
  card: {
    minWidth: 500,
    width: 470,
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
    width: 450,
  },
  menu: {
    width: 200,
  },
  button: {
    marginBottom: 20,
  },
});

function createWSConnection(callback) {
this.socket = new WebSocket("ws://localhost:3001/api/ws");
if(typeof callback === "function") {
  callback();
}
}

class AuthorizedApp extends React.Component {
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      title: 'Mockup',
      auth: {
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInBlcm1pc3Npb24iOiJnZW5lcmFsIiwiaWF0IjoxNTIxMDUwOTcwLCJleHAiOjE1MjEwNjg5NzB9.YqkfKj3CTI-0i5aH8D_E4MWvqPtIZGRQpaRZRvqFZDA',
      },
      "data": {
        "number": "",
        "psalmtext": "",
      },
      "message": {
        "type": "",
        "number": ""
      }
    };
    this.onMessage = this.onMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };
  
  componentWillMount() {
    this.socket = new WebSocket("ws://localhost:3001/api/ws");
    var token = JSON.stringify(this.state.auth);
    var socket = this.socket;
    this.socket.onopen = function (event) {
      socket.send(token);
    }
    this.socket.addEventListener("message", this.onMessage);
  }
  
  componentWillUnmount() {
    this.socket.close();
    this.socket = null;
  }
  
  // Event based functions
  
  onMessage(e) {
    var data = JSON.parse(e.data);
    console.log(data);
    if (data.number) {
      this.setState({"data": {"number": data.number}})
    };
    
    if (data.psalmtext) {
      this.setState({"data": {"psalmtext": data.psalmtext}})
    };
  }
  
  sendMessage(event) {
    var data = this.state.message;
    this.socket.send(data);
    this.setState({ message: { type: "", number: ""}});
  }
  
  handleClick(event) {
    event.preventDefault();
    if (event.target.id === "number") {
      const formdata = this.state.message;
      const field = "number";
      formdata[field] = formdata[field] + event.target.value;
      this.setState({formdata});
    }
    else if (event.target.id === "backspace") {
      const formdata = this.state.message;
      const field = "number";
      var sliced = formdata[field].slice(0, -1);
      formdata[field] = sliced;
      this.setState({formdata});
    }
    else if (event.target.id === "init_number") {
      if (this.state.message.type === "") {
        this.setState((prevState, props) => {
        return { message: { type: "song_number", number: prevState.message.number }}});
      }
      else if (this.state.message.type === "psalm_number") {
        // maybe change colour of the button
      }
      else {
        this.sendMessage();
      };
    }
    else if (event.target.id === "init_psalm") {
      if (this.state.message.type === "") {
        this.setState((prevState, props) => {
        return { message: { type: "psalm_number", number: prevState.message.number }}});
      }
      else if (this.state.message.type === "song_number") {
        // maybe change colour of the button
      }
      else {
        this.sendMessage();
      };
    }
  }
  
  render() {
    const { classes } = this.props;
    
    return (
    <div className='page-parent'>
      <header className='header'>
        <ResponsiveDrawer title={this.state.title}/>
      </header>
      <div className='container-full'>
        <div className='container-center'>
          <Card className={classes.card}>
            <CardContent>
                <TextField className={classes.textField} value={this.state.data.number} margin="normal" />
                <TextField className={classes.textField} value={this.state.data.psalmtext} margin="normal" />
                <TextField className={classes.textField} value={this.state.temporary} margin="normal" />
            </CardContent>
          </Card>
          <DialForm data={this.state.message} onClick={this.handleClick} />
        </div>
      </div>
    </div>
    )
  }
}

export default withStyles(styles)(AuthorizedApp);

// There is no need to pass this.state.message to DialForm
