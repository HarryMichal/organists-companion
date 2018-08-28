import React from 'react';
import 'whatwg-fetch';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AuthService from '../services/AuthService.js';

const styles = theme => ({
  verseContainer: {
    borderLeft: '1px solid black',
    height: '100%'
  },
  display4Song: {
    [theme.breakpoints.up('xs')]: {
      fontSize: '12rem'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '15rem'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '22rem'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '28rem'
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '40rem'
    },
  },
  display4Psalm: {
    [theme.breakpoints.up('xs')]: {
      fontSize: '2.6rem'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '3.5rem'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '5.5rem'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '7.7rem'
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '12rem'
    },
  },
  display3Verse: {
    [theme.breakpoints.up('xs')]: {
      fontSize: '1.8rem'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5rem'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '4rem'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '5rem'
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '7.5rem'
    },
  }
});

class OutputPage extends React.PureComponent {
  constructor() {
    super();
    this.state ={
      "data": {
        "type": "",
        "number": "",
        "verse": [],
        "psalmtext": "",
      },
      status: {
        isLoggedIn: true,
        isConnected: true,
        isError: false
      }
    };
    this.openConnection = this.openConnection.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }
  
  componentDidMount() {
    this.openConnection();
  }
  
  componentWillUnmount() {
    this.socket.close();
    this.socket = null;
  }
  
  openConnection() {
    const body = { "sub": "guest", "perm": "guest", "exp": "120min" };
    
    fetch("/api/guest", {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(json => {
      if (json.success == true) {
        AuthService.setToken(json.token, false, "guest-jwt")
        
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
        
        target += "?token=" + json.token;
        
        try {
          this.socket = new WebSocket(target);
        }
        finally {
          if (this.socket != undefined) {
            this.socket.onmessage = this.onMessage;
            this.socket.onopen = this.onOpen;
            this.socket.onclose = this.onClose;
            this.verifyToken();
          }
        }
        
      }
    })
  }
  
  
  verifyToken() {
    AuthService.verifyToken("guest-jwt", (valid, message) => {
      if (valid) {
        this.setState(prevState => ({
          status: {
            isLoggedIn: true,
            isConnected: prevState.status.isConnected,
            isError: prevState.status.isError
          }
        }));
        this.verificationTimer = setTimeout(this.verifyToken, 30000);
      }
      else {
        this.setState(prevState => ({
          status: {
            isLoggedIn: false,
            isConnected: prevState.status.isConnected,
            isError: prevState.status.isError
          },
        }))
        clearInterval(this.verificationTimer);
        this.openConnection();
      }
    })
  }
  
  onOpen(event) {
    this.setState(prevState => ({
      status: {
        isLoggedIn: true,
        isConnected: true,
        isError: false
      }
    }));
  };
  
  onClose(event) {
    this.verifyToken();
  }
  
  onMessage(event) {
    var data = JSON.parse(event.data);
    if (data.type === "song") {
      this.setState(prevState => ({
        data: {
          type: data.type,
          number: data.number,
          verse: data.activeverse,
          psalmtext: null
        }
      }));
    }
    
    if (data.type === "psalm") {
      console.log(data.text);
      this.setState(prevState => ({
        data: {
          type: data.type,
          number: data.number,
          verse: null,
          psalmtext: data.psalmtext
        }
      }));
    }
    
    if (data.type === "verse") {
      this.setState(prevState => ({
        data: {
          type: prevState.data.type,
          number: prevState.data.number,
          verse: data.activeverse,
          psalmtext: prevState.data.psalmtext
        }
      }))
    }
    
    if (data.type == "blank") {
      this.setState(prevState => ({
        data: {
          type: null,
          number: data.number,
          verse: data.activeverse,
          psalmtext: null
        }
      }))
    }
  }
  
  renderSong() {
    const { classes } = this.props;
    
    return(
      <Grid container className='container-main' justify='center' alignItems='center'>
        {this.state.data.verse.length == 0 ?
          
          <Grid container className='container-main' justify='center' alignItems='center'>
            <Grid item xs={12}>
              <Typography classes={{display4: classes.display4Song}} variant='display4' color='inherit'>
                {this.state.data.number}
              </Typography>
            </Grid>
          </Grid>
          
          :
          
          <Grid container className='container-main' justify='center' alignItems='center'>
            <Grid item xs={9}>
              <Typography classes={{display4: classes.display4Song}} variant='display4' color='inherit'>
                {this.state.data.number}
              </Typography>
            </Grid>
            <Grid item container direction='column' alignItems='center' justify='center' className={classes.verseContainer} xs={this.state.data.verse.length >= 13 ? 3 : 2}>
              {Array.from(this.state.data.verse).map((number) => (
                <Grid item xs={1.5} >
                  <Typography classes={{display3: classes.display3Verse}} variant='display3' color='inherit'>{number}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
          
        }
      </Grid>
    )
  }
  
  renderPsalm() {
    const { classes } = this.props;
    
    return(
      <Grid container className='container-main' justify='center' alignItems='center'>
        <Grid item className='wrap-main'>
          <Typography classes={{display4: classes.display4Psalm}} variant='display4' >Žalm: {this.state.data.number}</Typography>
          <Typography classes={{display4: classes.display4Psalm}} variant='display4' color='inherit'>
            {this.state.data.psalmtext}
          </Typography>
        </Grid>
      </Grid>
    )
  }
  
  render() {
    return(
      <div className='page-parent'>
        {this.state.data.type === "song" ?
          this.renderSong()
          :
          this.renderPsalm()
        }
      </div>
    )
  }
}

export default withStyles(styles)(OutputPage);
