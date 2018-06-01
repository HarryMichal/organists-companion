import React from 'react';
import Grid from '@material-ui/core/Grid';

import AppDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';
import WelcomeButtons from '../components/Buttons/WelcomeButtons';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      title: 'Home',
      form: 'login'
    }
    this.changeForm = this.changeForm.bind(this);
  };
  
  changeForm(event) {
      this.props.history.push("/auth/" + event.target.value);
  }
  
  render() {
    return (
    <div className='page-parent'>
      <header className='navbar'>
        <AppDrawer title={this.state.title}/>
      </header>
      <Grid container justify='center' alignItems='center' className='container-full'>
        <Grid item className='container-center'>
          <WelcomeButtons onClick={this.changeForm} />
        </Grid>
      </Grid>
    </div>
    )
  }
}

export default HomePage;
