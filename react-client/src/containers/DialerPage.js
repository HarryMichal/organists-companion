import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AppDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';
import DialForm from '../components/Forms/DialForm';

const styles = theme => ({
  
});

class DialerPage extends React.Component {
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      "title": "Dialer",
      "data": {
        "type": "",
        "song": "",
        "verse": "",
        "activeverse": "",
        "psalmtext": "",
      },
      "message": {
        "type": "",
        "number": "",
        "verse": [],
      }
    };
    this.onMessage = this.onMessage.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onError = this.onError.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  };
  
  componentWillMount() {
    var query = "token=" +  JSON.parse(sessionStorage.getItem("jwt")).token;
    this.socket = new WebSocket("ws://localhost:3001/api/ws?" + query);
    this.socket.onopen = this.onOpen;
    this.socket.onerror = this.onError;
  }
  
  componentWillUnmount() {
    if (this.socket !== null) {
      this.socket.close();
      this.socket = null;
    }
  }
  
  // Event based functions
  
  onMessage(event) {
    var data = JSON.parse(event.data);
    if (data.type === "song") {
      this.setState(prevState => ({
        data: {
          type: data.type,
          song: data.id,
          verse: data.verse,
          activeverse: data.activeverse,
          psalmtext: undefined
        }
      }));
    }
    
    if (data.type === "psalm") {
      this.setState(prevState => ({
        data: {
          type: data.type,
          song: undefined,
          verse: undefined,
          activeverse: undefined,
          psalmtext: data.psalmtext
        }
      }));
    }
    
    if (data.type === "verse") {
      this.setState(prevState => ({
        data: {
          type: prevState.data.type,
          song: prevState.data.song,
          verse: prevState.data.verse,
          activeverse: data.verse,
          psalmtext: prevState.data.psalmtext
        }
      }));
    }
  }
  
  onError(event) {
    this.props.history.push("/auth/login");
  }
  
  onOpen(event) {
    this.socket.onmessage = this.onMessage;
    console.log(this.socket);
  }
  
  sendMessage(event) {
    if (this.state.message.type === "song" || this.state.message.type === "psalm") {
      var msg = {
        type: this.state.message.type,
        number: this.state.message.number,
        verse: this.state.message.verse
      }
      this.socket.send(JSON.stringify(msg));
      this.setState({ message: { type: "", number: "", verse: ""}});
    }
    else if (event.type === "verse") {
      this.socket.send(JSON.stringify(event));
    }
  }
  
  handleClick(event) {
    event.preventDefault();
    var message = this.state.message;
    switch (event.target.id) {
      
      case 'number':
        if (message.type !== "") {
          var newNumber = event.target.value;
          this.setState(prevState => ({
            message: {
              type: prevState.message.type,
              number: prevState.message.number.concat([newNumber]),
            }
          }));
        }
        break;
        
      case 'backspace':
        this.setState(prevState => ({
          message: {
            type: prevState.message.type,
            number: prevState.message.number.slice(0, -1),
            verse: prevState.message.verse
          }
        }));
        break;
        
      case 'init_song':
        if (message.type === "") {
          var newType = event.target.value;
          this.setState(prevState => ({
            message: {
              type: prevState.message.type.concat([newType]),
              number: prevState.message.number,
              verse: prevState.message.verse
            }
          }));
        }
        else if (this.state.message.type === "song") {
          this.sendMessage();
        }
        break;
        
      case 'init_psalm':
        if (message.type === "") {
          var newType = event.target.value;
          this.setState(prevState => ({
            message: {
              type: prevState.message.type.concat([newType]),
              number: prevState.message.number,
              verse: prevState.message.verse
            }
          }));
        }
        else if (this.state.message.type === "psalm") {
          this.sendMessage();
        }
        break;
        
      case 'verse':
        var newType = event.target.id;
        var message = {};
        if (this.state.data.activeverse == undefined || this.state.data.activeverse.indexOf(parseInt(event.target.value)) === -1) {
          message = {
            type: event.target.id,
            subtype: "add",
            verse: event.target.value
          }
        }
        else {
          message = {
            type: event.target.id,
            subtype: "del",
            verse: event.target.value
          }
        }
        this.sendMessage(message);
        break;
        
      default:
        console.log("Error.")
        break;
    }
  }
  
  render() {
    const { classes } = this.props;
    
    return (
    <div className='page-parent'>
      <header className='navbar'>
        <AppDrawer title={this.state.data.song ? (this.state.data.song) : (this.state.data.psalmtext)}/>
      </header>
      <Grid container justify='center' alignItems='center' direction='column' spacing='16' className='container-full'>
        <Grid item className='container-dialer'>
          <DialForm message={this.state.message} data={this.state.data} onClick={this.handleClick} onSubmit={this.sendMessage} />
        </Grid>
      </Grid>
    </div>
    )
  }
}

export default withStyles(styles)(DialerPage);

/*
<Card className={classes.card}>
  <CardContent>
      <TextField className={classes.textField} value={this.state.data.number} margin="normal" />
      <TextField className={classes.textField} value={this.state.data.psalmtext} margin="normal" />
      <TextField className={classes.textField} value={this.state.temporary} margin="normal" />
  </CardContent>
</Card>
*/
