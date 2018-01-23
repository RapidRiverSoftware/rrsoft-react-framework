import React from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'

import { PrivateRoute, LoginPage } from '../auth'
import makeAdminPage from './makeAdminPage'

const AppComponent = ({ mainMenu }) => (
  <div>
    <Route path="/login" component={LoginPage}/>

    {
      mainMenu.map(item => {
        return (
          <PrivateRoute key={item.value} path={item.value} component={makeAdminPage(item.component)} />
        )
      })
    }

  </div>
)

const mapStateToProps = (state) => {
  const mainMenu = state.getIn(['core', 'mainMenu'])

  return {
    mainMenu: mainMenu ? mainMenu.toJS() : []
  }
}

export default connect(mapStateToProps)(AppComponent)
