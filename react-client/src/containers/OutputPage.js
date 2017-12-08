import React from 'react';

import AppBar from '../components/AppBar/AppBar';

class OutputPage extends React.Component {
  constructor(props) {
    super(props);
    // initial component state
    this.state = {
      title: 'Output',
      open: false
    };
}

export default OutputPage;
