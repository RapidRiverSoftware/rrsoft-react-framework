import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import flatMap from 'lodash/flatMap'

import { PrivateRoute, LoginPage } from '../auth'
import makeAdminPage from './makeAdminPage'
import ErrorMessage from '../errorMessage/ErrorMessage'

const AppComponent = (props) => {
  const { mainMenu, isLoggedIn, logo } = props

  return (
    <div>
      <ErrorMessage />
      <Route path="/login" component={LoginPage}/>

      {
        mainMenu.map(item => {
          return (
            <PrivateRoute
              key={item.value}
              isLoggedIn={isLoggedIn}
              path={item.value}
              exact
              component={makeAdminPage(item.component, { logo })} />
          )
        })
      }

      {
        flatMap(
          mainMenu.filter(
            item => item.children
          ).map(
            item => item.children.map(child => ({
              ...child,
              parent: item
            }))
          )
        ).map(child => {
          return <PrivateRoute
            key={`${child.parent.value}__${child.value}`}
            isLoggedIn={isLoggedIn}
            path={`${child.value}`}
            exact
            component={makeAdminPage(child.component, { logo })} />
        })
      }

    </div>
  )
}

const mapStateToProps = (state) => {
  const logo = state.getIn(['core', 'logo'])
  const mainMenu = state.getIn(['core', 'mainMenu'])

  return {
    mainMenu: mainMenu ? mainMenu.toJS() : [],
    isLoggedIn: true,  //aaron-todo: switch back
    logo
  }
}

export default connect(mapStateToProps)(AppComponent)
