'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _createReducer = require('../core/util/createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

var _actionTypes = require('./actionTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handlers = {};


var initialState = (0, _immutable.fromJS)({});

handlers[_actionTypes.ADD_ITEM] = function (state, action) {
  var key = action.key,
      value = action.value;

  return state.set(key, value);
};

var r = (0, _createReducer2.default)(initialState, handlers);
console.log(r);
exports.default = r;