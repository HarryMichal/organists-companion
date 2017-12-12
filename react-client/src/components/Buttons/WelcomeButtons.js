import React from 'react';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
    margin: 12,
  },

};

class BigButton extends React.Component {

  render() {
    return (<div className="welcome-buttons">
      <div className="welcome-button">
        <RaisedButton containerElement={<Link to="/signup" />} linkButton={true} style={styles.button} labelPosition="before" primary={true} label="Signup"/>
      </div>
      <br></br>
      <div className="welcome-button">
        <RaisedButton containerElement={<Link to="/login" />} linkButton={true} style={styles.button} labelPosition="center" primary={true} label="Login"/>
      </div>
      <br></br>
      <div className="welcome-button">
        <RaisedButton containerElement={<Link to="/output" />} linkButton={true} style={styles.button} labelPosition="before" primary={true} label="Output"/>
      </div>
    </div>)
  }
};

export default BigButton;
