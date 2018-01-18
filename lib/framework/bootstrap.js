'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('react-hot-loader/patch');

require('core-js/fn/object/entries');

require('rxjs/add/observable/dom/ajax');

require('rxjs/add/operator/mergeMap');

require('rxjs/add/operator/mapTo');

require('rxjs/add/operator/switchMap');

var _immutable = require('immutable');

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _configureStore = require('./configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _renderApp = require('./renderApp');

var _renderApp2 = _interopRequireDefault(_renderApp);

var _App = require('../App');

var _App2 = _interopRequireDefault(_App);

var _rootReducer = require('../rootReducer');

var _rootReducer2 = _interopRequireDefault(_rootReducer);

var _rootEpic = require('../rootEpic');

var _rootEpic2 = _interopRequireDefault(_rootEpic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bootstrap = function bootstrap() {
  var history = (0, _createBrowserHistory2.default)();
  var store = (0, _configureStore2.default)(_rootReducer2.default, _rootEpic2.default, (0, _immutable.Map)(), history);

  (0, _renderApp2.default)(_App2.default, store, history);

  if (module.hot) {
    module.hot.accept('../App', function () {
      (0, _renderApp2.default)(_App2.default, store, history);
    });
    module.hot.accept('../rootReducer', function () {
      store.replaceReducer(_rootReducer2.default);
    });
  }
};

exports.default = bootstrap;