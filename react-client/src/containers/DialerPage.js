import React from 'react';
import 'whatwg-fetch';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import AppDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';
import DialForm from '../components/Forms/DialForm';
import ErrorForm from '../components/Forms/ErrorForm';

import AuthService from '../services/AuthService';

const styles = theme => ({
  
});

class DialerPage extends React.PureComponent {
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      "title": "Dialer",
      "data": {
        "type": "",
        "number": "",
        "verse": "",
        "activeverse": "",
        "psalmtext": "",
      },
      "message": {
        "type": "",
        "number": "",
        "verse": [],
      },
      "status": {
        "isLoggedIn": false,
	      "isConnected": false,
        "isError": false
      },
      "snackBar": {
        "open": false,
        "text": "",
        "action": ""
      }
    };
    this.onMessage = this.onMessage.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onError = this.onError.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleCloseSnack = this.handleCloseSnack.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.openConnection = this.openConnection.bind(this);
    this.menuActions = this.menuActions.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
    this.isConnected = this.isConnected.bind(this);
    this.renderSnack = this.renderSnack.bind(this);
  };
  
  componentDidMount() {
    AuthService.verifyToken("jwt", (valid, message) => {
      if (valid) {
        this.openConnection();
        this.verifyToken();
        this.isConnected();
        AuthService.getUserData();
      }
      else {
        console.log(message);
	      this.props.history.push('/');
      }
    })
  }

  componentWillUnmount() {
    if (this.socket != null || this.socket != undefined) {
      this.socket.close();
      this.socket = null;
    }
    
    if (this.verificationTimer != null || this.verificationTimer != undefined) {
      clearTimeout(this.verificationTimer);
    }
    
    if (this.checkConnection != null || this.checkConnection != undefined) {
      clearTimeout(this.checkConnection);
    }
  }
  
  // Event based functions
  
  onMessage(event) {
    var data = JSON.parse(event.data);
    if (data.type === "song") {
      this.setState(prevState => ({
        data: {
          type: data.type,
          number: data.number,
          verse: data.verse,
          activeverse: data.activeverse,
          psalmtext: null
        }
      }));
    }
    
    if (data.type === "psalm") {
      this.setState(prevState => ({
        data: {
          type: data.type,
          number: data.number,
          verse: null,
          activeverse: null,
          psalmtext: data.psalmtext
        }
      }));
    }
    
    if (data.type === "verse") {
      this.setState(prevState => ({
        data: {
          type: prevState.data.type,
          number: prevState.data.number,
          verse: data.verse,
          activeverse: data.activeverse,
          psalmtext: prevState.data.psalmtext
        }
      }));
    }
    
    if (data.type === "blank") {
      this.setState(prevState => ({
        data: {
          type: null,
          number: data.number,
          verse: data.verse,
          activeverse: data.activeverse,
          psalmtext: null
        }
      }))
    }
  }
  
  onError(event) {
    this.setState(prevState => ({
      status: {
        isLoggedIn: prevState.status.isLoggedIn,
        isConnected: prevState.status.isConnected,
        isError: true,
      }
    }));
  }
  
  onOpen(event) {
    this.setState(prevState => ({
      status: {
        isLoggedIn: true,
        isConnected: true,
        isError: false
      }
    }))
  }
  
  onClose(event) {
    this.verifyToken();
    this.setState(prevState => ({
      status: {
        isLoggedIn: prevState.status.isLoggedIn,
        isConnected: false,
        isError: prevState.status.isError
      }
    }))
  }

  verifyToken() {
    AuthService.verifyToken('jwt', (valid, message) => {
      if (valid) {
        this.setState(prevState => ({
          status: {
            isLoggedIn: true,
            isConnected: prevState.status.isConnected,
            isError: prevState.status.isError
          }
        }));
        this.verificationTimer = setTimeout( () => {this.verifyToken()}, 30000);
      }
      else {
        this.setState(prevState => ({
          status: {
            isLoggedIn: false,
            isConnected: prevState.status.isConnected,
            isError: prevState.status.isError
          },
          snackBar: {
            open: true,
            text: "Your session has run out. Click this button to renew your session.",
            action: prevState.snackBar.action
          }
        }))
      }
    })
  }
  
  isConnected() {
    var readyState = this.socket.readyState;
    
    switch (readyState) {
      case 0:
        break;
      case 1:
        if (!this.state.status.isConnected) {
          this.setState(prevState => ({
            status: {
              isLoggedIn: prevState.status.isLoggedIn,
              isConnected: true,
              isError: prevState.status.isError
            }
          }));
        }
        break;
      case 2:
        break;
      case 3:
        if (this.state.status.isConnected) {
          this.setState(prevState => ({
            status: {
              isLoggedIn: prevState.status.isLoggedIn,
              isConnected: false,
              isError: prevState.status.isError
            }
          }));
        }
        break;
    }
    
    this.checkConnection = setTimeout(() => {this.isConnected()}, 500);
  }
  
  openConnection() {
    let target = "ws://";
    
    // Add a case for own development case expression
    switch (window.location.origin) {
      case 'http://localhost:3000':
        target += "localhost:3001/api/ws";
        break;
      case 'http://192.168.0.109:3000':
        target += "192.168.0.109:3001/api/ws";
        break;
      default:
        let origin = window.location.origin.slice(7);
        target += origin + "/api/ws"
        break;
    }
    
    target += "?token=" +  AuthService.getToken();
    
    try {
      this.socket = new WebSocket(target);
    }
    finally {
      if (this.socket != null) {
        this.socket.onopen = this.onOpen;
        this.socket.onerror = this.onError;
        this.socket.onclose = this.onClose;
        this.socket.onmessage = this.onMessage;
      }
    }
    
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
          if (message.number.length < 3) {
            var newNumber = event.target.value;
            this.setState(prevState => ({
              message: {
                type: prevState.message.type,
                number: prevState.message.number.concat([newNumber]),
              }
            }));
          }
        }
        break;
        
      case 'backspace':
        if (this.state.message.number)
        this.setState(prevState => ({
          message: {
            type: prevState.message.type,
            number: prevState.message.number.slice(0, -1),
            verse: prevState.message.verse
          }
        }));
        break;
        
      case 'delete':
        let blankMessage = {
          type: "blank"
        };
        this.socket.send(JSON.stringify(blankMessage));
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
        else if (message.type === "song" && message.number != "") {
          this.sendMessage();
        }
        else {
          this.setState({ message: { type: "", number: "", verse: ""}});
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
        else if (message.type === "psalm" && message.number != "") {
          this.sendMessage();
        }
        else {
          this.setState({ message: { type: "", number: "", verse: ""}});
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
  
  menuActions(event) {
    event.preventDefault();

    switch (event.target.id) {
      case "reconnect":
      try {
        this.socket.close();
        this.socket = null;
      }
      finally {
        this.openConnection();
      }
        break;
      case "relogin":
        var token = AuthService.getToken();
        var body = { token: token };
        
        fetch('/api/relogin', {
          method: 'post',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(response => {
            if (response.success) {
              AuthService.setToken(response.token);
              this.props.history.go(0)
            }
            else {
              this.props.history.push('/');
            }
          })
        break;
    }
  }
  
  handleCloseSnack(event) {
    event.preventDefault();
    
    this.setState((prevState) => ({
      snackBar: {
        open: !this.state.snackBar.open,
        text: prevState.snackBar.text,
        action: prevState.snackBar.action
      }
    }))
  }

  renderSnack() {
    const { classes } = this.props;
    
    let onClick = (event) => {
      this.menuActions(event);
      this.handleCloseSnack(event);
    }

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            'vertical': 'top',
            'horizontal': 'middle'
          }}
          open={this.state.snackBar.open}
          autoHideDuration={15000}
          onClose={this.handleCloseSnack}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>{this.state.snackBar.text}</span>}
          action={[
            <Button id='relogin' color='secondary' size='small' onClick={onClick}>
              Relogin
            </Button>,
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              className={classes.closeSnack}
              onClick={this.handleCloseSnack}
            >

              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    )
  }
  
  render() {
    const { classes } = this.props;
    
    let drawerOnClick = {
      login: () => {this.props.history.push("/")},
      reconnect: () => {
        if (this.socket != undefined || this.socket != null) {
          try {
            this.socket.close();
          }
          finally {
            this.openConnection()
          }
        }
        else this.openConnection()
      }
    };
    
    return (
    <div className='page-parent'>
      <header className='navbar'>
        <AppDrawer title={this.state.data.psalmtext} status={this.state.status} onClick={this.menuActions}/>
      </header>
      {this.renderSnack()}
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
