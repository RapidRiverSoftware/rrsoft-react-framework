import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import Theme from '../../framework/Theme'
import App from './App'

const AppContainer = ({ store }) => {
  return (
    <Router>
      <Provider store={store}>
        <Theme>
          <App />
        </Theme>
      </Provider>
    </Router>
  )
}

export default AppContainer
