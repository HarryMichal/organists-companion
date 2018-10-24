import React from 'react';
import 'whatwg-fetch';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AuthService from '../services/AuthService.js';

const styles = theme => ({
  display4Song: {
    lineHeight: '0.95em',
    fontWeight: '400',
    margin: 0,
    padding: 0,
    [theme.breakpoints.up('xs')]: {
      fontSize: '12rem'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '15rem'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '28rem'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '34rem'
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '41rem'
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
      fontSize: '6.5rem'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '7.8rem'
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
      fontSize: '5rem'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '6rem'
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
        isLoggedIn: false,
        isConnected: false,
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
    this.checkConnectionInterval = setInterval(() => {
      this.verifyToken();
    }, 3000)
  }

  componentWillUnmount() {
    this.socket.close();
    clearInterval(this.checkConnectionInterval);
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

        if (!this.state.status.isConnected) {
          this.openConnection();
        }
      }
      else {
        this.setState(prevState => ({
          status: {
            isLoggedIn: false,
            isConnected: prevState.status.isConnected,
            isError: prevState.status.isError
          },
        }))
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
    this.setState(prevState => ({
      status: {
        isLoggedIn: prevState.isLoggedIn,
        isConnected: false,
        isError: prevState.isError
      }
    }));
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

    if (this.state.data.verse.length !== 0) {
      return(
        <Grid container className='container-main' direction='column' justify='center' alignItems='center'>
          <Grid item >
            <Typography classes={{ display4: classes.display4Song }} variant='display4' color='inherit'>
              {this.state.data.number}
            </Typography>
          </Grid>
          <Grid item container alignItems='center' justify='center' >
            <div></div>
            {Array.from(this.state.data.verse).map((number) => (
              <Grid key={number} item xs={1} >
                <Typography classes={{ display3: classes.display3Verse }} variant='display3' color='inherit'>{number}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )
    }
    else {
      return(
        <Grid container className='container-main' justify='center' alignItems='center'>
          <Grid item xs={12}>
            <Typography classes={{display4: classes.display4Song}} variant='display4' color='inherit'>
              {this.state.data.number}
            </Typography>
          </Grid>
        </Grid>
      )
    }
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
    if (this.state.data.type === "song") {
      return(
        <div className='page-parent'>
          {this.renderSong()}
        </div>
      )
    }
    else if (this.state.data.type === "psalm") {
      return(
        <div className='page-parent'>
          {this.renderPsalm()}
        </div>
      )
    }
    else {
      return(
        <div className='page-parent'></div>
      )
    }
  }
}

export default withStyles(styles)(OutputPage);
