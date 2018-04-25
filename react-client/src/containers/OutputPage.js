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
        "type": "TEST_TYPE",
        "song": "TEST_SONG",
        "verse": "TEST_VERSE",
        "psalmtext": "TEST_PSALMTEXT",
      }
    };
    
  } // end of constructor
  
  render() {
    return(
      <div className='page-parent'>
        <div className='container-full'>
          <div className="container-center">
          <p>
          {this.state.data.type}
          </p>
          <p>
          {this.state.data.song}
          </p>
          <p>
          {this.state.data.verse}
          </p>
          <p>
          {this.state.data.psalmtext}
          </p>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(OutputPage);
