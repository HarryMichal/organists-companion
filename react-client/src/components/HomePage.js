import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Card from 'material-ui/Card';
import CardTitle from 'material-ui/Card';

const HomePage = () => (
<MuiThemeProvider>
  <Card className="container">
    <CardTitle title="React Application" subtitle="This is the home page." />
  </Card>
</MuiThemeProvider>
);

export default HomePage;
