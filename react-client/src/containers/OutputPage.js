import React from 'react';
import fetch from 'node-fetch';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  
});

class OutputPage extends React.Component {
  constructor() {
    super();
    this.state ={
      "data": {
        "type": "t",
        "song": "s",
        "verse": [],
        "psalmtext": "t",
      }
    };
    this.onMessage = this.onMessage.bind(this);
  } // end of constructor
  
  componentWillMount() {
    const body = { "sub": "guest", "perm": "guest", "exp": "7d" };
    fetch("http://localhost:3000/api/guest", {
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
    console.log(data);
    if (data.type === "song") {
      this.setState(prevState => ({ data: { type: data.type, song: data.id, verse: data.verse, psalmtext: ""}}));
    }
    
    if (data.type === "psalm") {
      this.setState(prevState => ({"data": { type: data.type, song: "", verse: "", "psalmtext": data.text}}));
    }
  }
  
  renderVerse() {
    return(
      <Grid container justif='center' alignItems='center' direction='column' spacing="8">
        {Array.from(this.state.data.verse).map((num) => (
          <Grid item xs={8}>
            <p>
            {num}
            </p>
          </Grid>
        ))
        }
      </Grid>
    )
  }
  
  render() {
    return(
      <Grid container justify='center' alignItems='center' className='page-parent'>
        <Grid item className="container-outputleft">
          {this.state.data.song ?
          <p className="textbox-number">
          {this.state.data.song}
          </p> :
          <p className="textbox-psalm">
          {this.state.data.psalmtext}
          </p>}
        </Grid>
        <Grid item className="container-outputright">
          {this.renderVerse()}
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(OutputPage);
