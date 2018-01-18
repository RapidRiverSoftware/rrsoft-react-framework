'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _configureStore = require('./configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _reduxImmutable = require('redux-immutable');

var _immutable = require('immutable');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _actions = require('./actions');

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var featureConfigs = [];
var reducers = {};
var dispatchQueue = [];

var isStarted = false;
var DefaultApp = null;
var installCount = -1;

var core = {
  // bootstraping for apps
  addReducer: function addReducer(name, reducer) {
    reducers[name] = reducer;
  },


  // install feature
  install: function install(feature) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    featureConfigs.push({ register: feature.register, options: options });
    // console.log(feature)
  },
  addItem: function addItem(key, value) {
    if (isStarted) {
      this.store.dispatch((0, _actions.addItem)(key, value));
    } else {
      dispatchQueue.push((0, _actions.addItem)(key, value));
    }
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
        _this.store = (0, _configureStore2.default)((0, _reduxImmutable.combineReducers)(reducers), function () {}, (0, _immutable.Map)({}), history);
        _reactDom2.default.render(_react2.default.createElement(DefaultApp, { store: _this.store }), rootNode);
        isStarted = true;
        (0, _each2.default)(dispatchQueue, function (action) {
          return _this.store.dispatch(action);
        });
        console.log("finish installing");
      }
    };

    installCount = -1;

    next();
  }
};

exports.default = core;