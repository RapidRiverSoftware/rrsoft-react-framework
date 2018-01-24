'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrivateRoute = exports.LoginPage = undefined;

var _LoginPage = require('./LoginPage');

Object.defineProperty(exports, 'LoginPage', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_LoginPage).default;
  }
});

var _PrivateRoute = require('./PrivateRoute');

Object.defineProperty(exports, 'PrivateRoute', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PrivateRoute).default;
  }
});

var _makeEpic = require('./makeEpic');

var _makeEpic2 = _interopRequireDefault(_makeEpic);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  register: function register(core, options, next) {
    console.log("installing auth");

    core.addEpic((0, _makeEpic2.default)(options.url || '/login'));
    core.addReducer('auth', _reducer2.default);

    next();
  }
};