import React from 'react'
import { connect } from 'react-redux';
import { Provider } from 'react-redux'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { PrivateRoute, LoginPage } from '../auth'
import makeAdminPage from './makeAdminPage'


const BasicExample = ({ items, store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/login" component={LoginPage}/>
        <PrivateRoute path="/dashboard" component={makeAdminPage(() => <div>made dash</div>)} />
      </div>
    </Router>
  </Provider>
)

const mapStateToProps = (state) => {
  return {
    items: state.getIn(['core', 'mainMenu'])
  }
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BasicExample)
