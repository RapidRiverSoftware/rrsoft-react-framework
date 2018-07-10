// @flow
import React from 'react'
import { Route, Redirect } from 'react-router'

const PrivateRoute = ({ component: Component, isLoggedIn = false, ...rest }) => {
  return <Route {...rest} render={props => {
    return (
      <div>
        {
          isLoggedIn ?
            <Component {...props} /> :
            <Redirect from={props.location.pathname} to="/login" />
        }
      </div>
    )
  }}/>
}

export default PrivateRoute
