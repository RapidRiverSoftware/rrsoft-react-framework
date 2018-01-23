import React from 'react'
import { connect } from 'react-redux';
import { Provider } from 'react-redux'
import Theme from '../../framework/Theme'
import styled, { withTheme} from 'styled-components'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { PrivateRoute, LoginPage } from '../auth'
import makeAdminPage from './makeAdminPage'

const Lala = withTheme(styled.div`border: 1px solid ${props => props.theme.color && props.theme.color.primary || 'black' }`)

const BasicExample = ({ items, store }) => (
  <Provider store={store}>
    <Theme>
      <Router>
        <div>
          <Lala />
          <Route path="/login" component={LoginPage}/>
          <PrivateRoute path="/dashboard" component={makeAdminPage(() => <div>made dash</div>)} />
        </div>
      </Router>
    </Theme>
  </Provider>
)

const mapStateToProps = (state) => {
  return {
    items: state.getIn(['core', 'mainMenu'])
  }
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BasicExample)
