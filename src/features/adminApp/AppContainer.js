import React from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'

import Theme from '../../framework/Theme'
import App from './App'

const AppContainer = ({ store, history }) => {
  return (
    <Provider store={store}>
      <Theme>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Theme>
    </Provider>
  )
}

export default AppContainer
