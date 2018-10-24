import React from 'react';
import 'whatwg-fetch';
import Grid from '@material-ui/core/Grid';

import AppDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';
import PsalmsTable from '../components/Tables/PsalmsTable';

export default class CatalogPage extends React.PureComponent {
  constructor() {
    super();
    
    this.state = {
      "title": "Psalms",
      "psalms": []
    }
    this.getPsalms = this.getPsalms.bind(this);
  }
  
  componentDidMount() {
    this.getPsalms();
  }
  
  async getPsalms() {
    try {
      let response = await fetch('/api/psalms');
      response = await response.json();
      
      let psalms = response.psalms;
      
      this.setState(prevState => ({
        psalms: psalms
      }))
    }
    catch (e) {
      console.error(e);
    }
  }
  
  render() {
    return(
      <div className='page-parent'>
        <header className='navbar'>
          <AppDrawer title={this.state.title}/>
        </header>
        <Grid container justify="center" alignItems="center"
        className="container-full"
        direction="column">
          <PsalmsTable psalms={this.state.psalms} />
        </Grid>
      </div>
    )
  }
}
