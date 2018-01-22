// @flow
import React from 'react'
import { reduxForm } from 'redux-form/immutable';

import TextField from '../form/TextField'
import PasswordField from '../form/PasswordField'

import { login } from './action';
import { connect } from 'react-redux';

export const LoginFormComponent = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <TextField name="username" label="Username" />
    <PasswordField name="password" label="Password" />
    <input type="submit" />
  </form>
)

const mapDispatchToProps = dispatch => ({
  doLogin: data => {
    console.log(data)
  }
});


export default reduxForm({
  form: 'login',
})((LoginFormComponent))
