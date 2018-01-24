'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _createReducer = require('../util/redux/createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

var _actionType = require('./actionType');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handlers = {};


var initialState = (0, _immutable.fromJS)({});

handlers[_actionType.ADD_ITEM] = function (state, action) {
  var key = action.key,
      value = action.value;

  return state.updateIn([key], function (arr) {
    return arr ? arr.push(value) : (0, _immutable.fromJS)([value]);
  });
};

handlers[_actionType.SET_ITEM] = function (state, action) {
  return state.set(action.key, action.value);
};

exports.default = (0, _createReducer2.default)(initialState, handlers);