import React from 'react'
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom'

import { PrivateRoute, LoginPage } from '../auth'
import makeAdminPage from './makeAdminPage'
import ErrorMessage from '../errorMessage/ErrorMessage'

const AppComponent = (props) => {
  const { mainMenu, logo } = props

  return (
    <div>
      <ErrorMessage />
      <Route path="/login" component={LoginPage}/>

      {
        mainMenu.map(item => {
          return (
            <PrivateRoute key={item.value} path={item.value} component={makeAdminPage(item.component, logo)} />
          )
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
    logo
  }
}

export default withRouter(connect(mapStateToProps)(AppComponent))
