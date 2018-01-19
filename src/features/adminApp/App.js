import React from 'react'
import { connect } from 'react-redux';
import { Provider } from 'react-redux'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { PrivateRoute, LoginPage } from '../auth'

const Public = (props) => <div></div>

const BasicExample = ({ items, store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <LoginPage />
        {/* <AuthButton/> */}
        <ul>
          <li><Link to="/public">Public Page</Link></li>
          <li><Link to="/protected">Protected Page</Link></li>
        </ul>
        <Route path="/public" render={props => <div>{JSON.stringify(props)}</div>}/>
        <Route path="/login" component={LoginPage}/>

        <PrivateRoute path="/protected" component={(props) => <div>i am protected{props.hello}=</div>} />
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
