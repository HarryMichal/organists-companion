import React from 'react';
import 'whatwg-fetch';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  
});

class OutputPage extends React.Component {
  constructor() {
    super();
    this.state ={
      "data": {
        "type": "",
        "song": "",
        "verse": [],
        "psalmtext": "",
      }
    };
    this.onMessage = this.onMessage.bind(this);
  }
  
  componentWillMount() {
    const body = { "sub": "guest", "perm": "guest", "exp": "7d" };
    fetch("http://localhost:3000/api/guest", {
    fetch("/api/guest", {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json.token);
      let query = "token=" + json.token;
      this.socket = new WebSocket("ws://localhost:3001/api/ws?" + query);
      this.socket.addEventListener("message", this.onMessage);
    })
  }
  
  componentWillUnmount() {
    this.socket.close();
    this.socket = null;
  }
  
  // Event based functions
  
  onMessage(event) {
    var data = JSON.parse(event.data);
    if (data.type === "song") {
      this.setState(prevState => ({
        data: {
          type: data.type,
          song: data.id,
          verse: data.activeverse,
          psalmtext: undefined
        }
      }));
    }
    
    if (data.type === "psalm") {
      console.log(data.text);
      this.setState(prevState => ({
        data: {
          type: data.type,
          song: undefined,
          verse: undefined,
          psalmtext: data.psalmtext
        }
      }));
    }
    
    if (data.type === "verse") {
      this.setState(prevState => ({
        data: {
          type: prevState.data.type,
          song: prevState.data.song,
          verse: data.verse,
          psalmtext: prevState.data.psalmtext
        }
      }))
    }
  }
  
  renderSong() {
    return(
      <Grid container className='container-main' justify='center' alignItems='center'>
        {this.state.data.verse.length == 0 ?
          <Grid container className='container-main' justify='center' alignItems='center'>
            <Grid item className='wrap-main'>
              <p className='textbox-number'>
                {this.state.data.song}
              </p>
            </Grid>
          </Grid>
          :
          <Grid container className='container' justify='center' alignItems='center'>
            <Grid item className='container-outputleft'>
              <p className="textbox-number">
                {this.state.data.song}
              </p>
            </Grid>
            <Grid item className='container-outputright'>
              {Array.from(this.state.data.verse).map((num) => (
                <Grid item className="wrap-verse">
                  <p className='textbox-verse'>{num}</p>
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
          <p className='textbox-psalm'>
            {this.state.data.psalmtext}
          </p>
        </Grid>
      </Grid>
    )
  }
  
  render() {
    return(
      <Grid container className='page-parent' justify='center' alignItems='center'>
        {this.state.data.type === "song" ?
          this.renderSong()
          :
          this.renderPsalm()
        }
      </Grid>
    )
  }
}

export default withStyles(styles)(OutputPage);
