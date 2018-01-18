'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addItem = undefined;

var _immutable = require('immutable');

var _actionTypes = require('./actionTypes');

var addItem = exports.addItem = function addItem(key, value) {
  return {
    type: _actionTypes.ADD_ITEM,
    key: key,
    value: value
  };
};