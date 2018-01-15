// @flow
import React from 'react'
import {
  Route,
  withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'
import core from '../../framework/core'

const PrivateRoute = ({ component: Component, isLoggedIn = false, ...rest }) => {
  const Redirect = core.Redirect;
  
  return <Route {...rest} render={props => {
    //todo ivan: why <Redirect> doesn't work here
    if (!isLoggedIn) document.location.replace('/login')

    return isLoggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  }}/>
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.getIn(['auth', 'token'])  //aaron-todo: switch back
  }
};

export default withRouter(connect(mapStateToProps)(PrivateRoute))
