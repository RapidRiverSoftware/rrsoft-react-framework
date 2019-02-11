// @flow
import React from 'react'
import { reduxForm } from 'redux-form/immutable';

import TextField from '../form/TextField'
import PasswordField from '../form/PasswordField'
import ErrorMessage from '../form/ErrorMessage'
import UpToDown from '../../components/grouping/UpToDown'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux';

export const LoginFormComponent = ({ isLoggedIn, handleSubmit, serverErrorMessage, successLoginUrl }) => {
  if (isLoggedIn) return <Redirect to={successLoginUrl} />

  return <form onSubmit={handleSubmit}>
    <UpToDown>
      <ErrorMessage message={serverErrorMessage} />
      <TextField name="username" label="Username" />
      <PasswordField name="password" label="Password" />
      <button type="submit">Log In</button>
    </UpToDown>
  </form>
}

const mapStateToProps = state => ({
  isLoggedIn: true, // disable auth
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
