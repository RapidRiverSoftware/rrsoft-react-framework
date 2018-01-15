// @flow
import React from 'react'
import { connect } from 'react-redux';
import LoginForm from './LoginForm'

import { login } from './action'

export const LoginWidget = ({ doLogin }) => <LoginForm onSubmit={doLogin} />

const mapDispatchToProps = dispatch => ({
  doLogin: data => {
    dispatch(login(data))
  }
});


export default connect(null, mapDispatchToProps)(LoginWidget)
