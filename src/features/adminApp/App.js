import React from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'

import { PrivateRoute, LoginPage } from '../auth'
import makeAdminPage from './makeAdminPage'

const AppComponent = ({ items, store }) => (
  <div>
    <Route path="/login" component={LoginPage}/>

    <PrivateRoute path="/dashboard" component={makeAdminPage(() => <div>made dash</div>)} />
  </div>
)

const mapStateToProps = (state) => {
  return {
    items: state.getIn(['core', 'mainMenu'])
  }
};

export default connect(mapStateToProps)(AppComponent)
