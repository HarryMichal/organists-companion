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
      <TextField floatingLabelText="Username" name="username" errorText={errors.username} onChange={onChange} value={user.username} required/>
    </div>

    <div className='field-line'>
      <TextField floatingLabelText="Password" type="password" name="password" onChange={onChange} errorText={errors.password} vaule={user.password} required/>
    </div>
    <br></br>
    <div className='button-line'>
      <RaisedButton type="submit" primary={true} label="Login"/>
    </div>

    <Link to="/signup"><CardText>Don't have an account?</CardText></Link>
  </form>
</Card>);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
