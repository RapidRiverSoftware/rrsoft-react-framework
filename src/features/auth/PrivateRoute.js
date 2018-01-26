// @flow
import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, isLoggedIn = false, ...rest }) => (
  <Route {...rest} render={props => (
    isLoggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.getIn(['auth', 'token']) || true //aaron-todo: switch back
  }
};

export default connect(mapStateToProps)(PrivateRoute)
