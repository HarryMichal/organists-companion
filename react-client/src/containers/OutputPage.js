import React from 'react';
import { withStyles } from 'material-ui/styles';
import fetch from 'node-fetch';

const styles = theme => ({
  
});

class OutputPage extends React.Component {
  constructor() {
    super();
    this.state ={
      "data": {
        "type": "t",
        "song": "s",
        "verse": "v",
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
  
  render() {
    return(
      <div className='page-parent'>
        <div className="container-output">
          <div className="container-outputleft">
            <p className="textbox-number">
            {this.state.data.song}
            {this.state.data.psalmtext}
            </p>
          </div>
          <div className="container-outputright">
            <p className="textbox-verse">
            {this.state.data.verse}
            </p>
          </div>
      
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(OutputPage);
