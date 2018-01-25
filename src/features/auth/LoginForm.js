// @flow
import React from 'react'
import { reduxForm } from 'redux-form/immutable';

import TextField from '../form/TextField'
import PasswordField from '../form/PasswordField'
import ErrorMessage from '../form/ErrorMessage'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux';

export const LoginFormComponent = ({ isLoggedIn, handleSubmit, serverErrorMessage, successLoginUrl }) => {
  if (isLoggedIn) return <Redirect to={successLoginUrl} />

  return <form onSubmit={handleSubmit}>
    <ErrorMessage message={serverErrorMessage} />
    <TextField name="username" label="Username" />
    <PasswordField name="password" label="Password" />
    <button type="submit">Log In</button>
  </form>
}

const mapStateToProps = state => ({
  isLoggedIn: state.getIn(['auth', 'token']),
  serverErrorMessage: state.getIn(['auth', 'error']),
  successLoginUrl: state.getIn(['core', 'successLoginUrl']),
  initialValues: {
    username: 'super',
    password: 'qwe123'
  }
})

export default connect(mapStateToProps)(reduxForm({
  form: 'login',
})((LoginFormComponent)))
