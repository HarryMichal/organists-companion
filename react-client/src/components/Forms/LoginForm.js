import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const LoginForm = ({onSubmit, onChange, errors, user}) => (<Card className="container-formwrap">
  <form action="/" onSubmit={onSubmit}>

    {errors.summary && <p className="error-message">{errors}</p>}

    <div className='field-line'>
      <TextField hintText="Enter your Username" floatingLabelText="Username" name="username" errorText={errors.email} onChange={onChange} value={user.username}/>
    </div>

    <div className='field-line'>
      <TextField type="password" name="password" hintText="Enter your Password" floatingLabelText="Password" onChange={onChange} errorText={errors.password} vaule={user.password}/>
    </div>
    <br></br>
    <div className='button-line'>
      <RaisedButton label="Submit" primary={true}/>
    </div>

    <CardText>Don't have an account?
      <Link to={'/signup'}></Link>
    </CardText>
  </form>
</Card>);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
