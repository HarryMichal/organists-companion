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
  display4: {
    [theme.breakpoints.up('xs')]: {
      fontSize: '10rem'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '16rem'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '22rem'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '28rem'
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '34rem'
    },
  },
  display3: {
    [theme.breakpoints.up('xs')]: {
      fontSize: '1.5rem'
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
      fontSize: '6rem'
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
        
        let query = "token=" + json.token;
        
        try {
          this.socket = new WebSocket("ws://localhost:3001/api/ws?" + query);
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
          number: null,
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
              <Typography classes={{display4: classes.display4}} variant='display4' color='inherit'>
                {this.state.data.number}
              </Typography>
            </Grid>
          </Grid>
          
          :
          
          <Grid container className='container-main' justify='center' alignItems='center'>
            <Grid item xs={10}>
              <Typography classes={{display4: classes.display4}} variant='display4' color='inherit'>
                {this.state.data.number}
              </Typography>
            </Grid>
            <Grid item container direction='column' alignItems='center' justify='center' className={classes.verseContainer} xs={2}>
              {Array.from(this.state.data.verse).map((number) => (
                <Grid item xs={2} >
                  <Typography classes={{display3: classes.display3}} variant='display3' color='inherit'>{number}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
          
        }
      </Grid>
    )
  }
  
  renderPsalm() {
    return(
      <Grid container className='container-main' justify='center' alignItems='center'>
        <Grid item className='wrap-main'>
          <Typography variant='display4' color='inherit'>
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
