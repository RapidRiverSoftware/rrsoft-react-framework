'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxObservable = require('redux-observable');

var _reactRouterRedux = require('react-router-redux');

var configureStore = function configureStore(rootReducer, rootEpic, initialState, history) {
  // const epicMiddleware = createEpicMiddleware(rootEpic);
  var historyRouterMiddleware = (0, _reactRouterRedux.routerMiddleware)(history);

  var middlewares = [historyRouterMiddleware];

  var enhancers = [_redux.applyMiddleware.apply(undefined, middlewares)];

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return (0, _redux.createStore)((0, _redux.compose)(_reactRouterRedux.routerReducer, rootReducer), initialState, _redux.compose.apply(undefined, enhancers));
};
/* global window */
exports.default = configureStore;