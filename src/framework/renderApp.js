// @flow
/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const renderApp = (App: any, store: any, history: any) => {
  ReactDOM.render(
    <AppContainer>
      <App store={store} history={history} />
    </AppContainer>,
    document.getElementById('root'),
  );
};

export default renderApp;
