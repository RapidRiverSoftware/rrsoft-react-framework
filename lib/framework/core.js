'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _configureStore = require('./configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _reduxImmutable = require('redux-immutable');

var _immutable = require('redux-form/immutable');

var _reactRouterRedux = require('react-router-redux');

var _reduxObservable = require('redux-observable');

var _immutable2 = require('immutable');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

require('rxjs/add/observable/dom/ajax');

require('rxjs/add/operator/filter');

require('rxjs/add/operator/mapTo');

require('rxjs/add/operator/mergeMap');

require('rxjs/add/operator/switchMap');

var _action = require('./action');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var featureConfigs = [];
var reducers = {};
var epics = [];
var dispatchQueue = [];
var config = [];

var isStarted = false;
var DefaultApp = null;
var installCount = -1;

var core = {
  addReducer: function addReducer(name, reducer) {
    reducers[name] = reducer;
  },
  addEpic: function addEpic(epic) {
    if ((0, _isArray2.default)(epic)) {
      epics.push.apply(epics, _toConsumableArray(epic));
    } else {
      epics.push(epic);
    }
  },


  // install feature
  install: function install(feature) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    featureConfigs.push({ register: feature.register, options: options });
  },
  set: function set(name, value) {
    config[name] = value;
  },
  get: function get(name) {
    return config[name];
  },
  addItem: function addItem(key, value) {
    if (isStarted) {
      this.store.dispatch((0, _action.addItem)(key, value));
    } else {
      dispatchQueue.push((0, _action.addItem)(key, value));
    }
  },
  dispatch: function dispatch(action) {
    this.store.dispatch(action);
  },
  setDefaultApp: function setDefaultApp(App) {
    DefaultApp = App;
  },


  // start the app
  start: function start(rootNode) {
    var _this = this;

    var next = function next() {
      installCount += 1;
      var featureConfig = featureConfigs[installCount];
      _this.addReducer('core', _reducer2.default);

      if (featureConfig) {
        var register = featureConfig.register;
        register(_this, featureConfig.options, next);
      } else {
        var history = (0, _createBrowserHistory2.default)();
        console.log(epics);
        _this.store = (0, _configureStore2.default)((0, _reduxImmutable.combineReducers)(reducers), _reduxObservable.combineEpics.apply(undefined, epics), (0, _immutable2.Map)({}), history);
        _reactDom2.default.render(_react2.default.createElement(DefaultApp, { store: _this.store }), rootNode);
        isStarted = true;
        (0, _each2.default)(dispatchQueue, function (action) {
          return _this.store.dispatch(action);
        });
        console.log("finish installing");
      }
    };

    installCount = -1;
    this.addReducer('routing', _reactRouterRedux.routerReducer);
    this.addReducer('form', _immutable.reducer);

    next();
  }
};

window.rrcore = core;

exports.default = core;