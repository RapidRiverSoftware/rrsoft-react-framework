// @flow
import React from 'react'
import { connect } from 'react-redux';
import LoginForm from './LoginForm'

export const LoginWidget = ({ doLogin }) => <LoginForm onSubmit={doLogin} />

const mapDispatchToProps = dispatch => ({
  doLogin: data => {
    console.log(data)
  }
});


export default connect(null, mapDispatchToProps)(LoginWidget)
