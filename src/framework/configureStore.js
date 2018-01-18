// @flow
/* global window */
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerReducer, routerMiddleware } from 'react-router-redux';

type Store = Object;

const configureStore = (
  rootReducer: Function,
  rootEpic: Function,
  initialState: {},
  history: Object,
): Store => {
  // const epicMiddleware = createEpicMiddleware(rootEpic);
  const historyRouterMiddleware = routerMiddleware(history);

  const middlewares = [historyRouterMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(
    compose(routerReducer, rootReducer),
    initialState,
    compose(...enhancers),
  );
};

export default configureStore;
