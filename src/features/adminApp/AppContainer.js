import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Theme from '../../framework/Theme'
import App from './App'

const AppContainer = ({ store }) => (
  <Provider store={store}>
    <Theme>
      <Router>
        <App />
      </Router>
    </Theme>
  </Provider>
)

export default AppContainer
