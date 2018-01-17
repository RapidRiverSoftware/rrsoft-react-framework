// @flow

import 'react-hot-loader/patch';
import 'core-js/fn/object/entries';

import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';
import { Map } from 'immutable';
import createHistory from 'history/createBrowserHistory';

import configureStore from './configureStore';
import renderApp from './renderApp';

import App from '../App';
import rootReducer from '../rootReducer';
import rootEpic from '../rootEpic';

const bootstrap = () => {
  const history = createHistory();
  const store = configureStore(rootReducer, rootEpic, Map(), history);

  renderApp(App, store, history);

  if (module.hot) {
    (module: Object).hot.accept('../App', () => {
      renderApp(App, store, history);
    });
    (module: Object).hot.accept('../rootReducer', () => {
      store.replaceReducer(rootReducer);
    });
  }
};

export default bootstrap;
