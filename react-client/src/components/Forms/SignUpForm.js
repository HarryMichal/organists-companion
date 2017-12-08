import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const SignUpForm = ({onSubmit, onChange, errors, user}) => (<Card className="container">
  <form action="/" onSubmit={onSubmit}>
    <h2 className="card-heading">Sign Up</h2>

    {errors.summary && <p className="error-message">{errors}</p>}

    <div className="field-line">
      <TextField floatingLabelText="Username" name="username" errorText={errors.name} onChange={onChange} value={user.username}/>
    </div>

    <div className="field-line">
      <TextField floatingLabelText="Email" name="email" errorText={errors.email} onChange={onChange} value={user.email}/>
    </div>

    <div className="field-line">
      <TextField floatingLabelText="Password" type="password" name="password" onChange={onChange} errorText={errors.password} value={user.password}/>
    </div>

    <div className="button-line">
      <RaisedButton type="submit" label="Create New Account"/>
    </div>

    <CardText containerElement={<Link to="/" />} >Already have an account?
    </CardText>
  </form>
</Card>);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm
/*
	// refs
	form: null;
	usernameElem: null;
	passwordElem: null;

	render() {
		const { onRegister } = this.props;
		return (
			<div className="container">
				<form
					ref={(elem) => this.form = elem}
					onSubmit={(e) => {
						e.preventDefault();
						return onRegister({
							username: this.usernameElem.value,
							password: this.passwordElem.value
						});
					}}
				>
					<input ref={(input) => this.usernameElem = input} type='text' name="username" placeholder='Enter Username' />
					<input ref={(input) => this.passwordElem = input} type='password' name="password" placeholder='Password' />
					<button
						className="btn btn-default"
						type='submit'
					>
						Submit
					</button>
				</form>
			</div>
		)
	}
}
*/
