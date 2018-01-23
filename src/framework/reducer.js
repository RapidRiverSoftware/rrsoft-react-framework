// @flow
import { fromJS } from 'immutable';
import createReducer from '../util/redux/createReducer';

import {
  ADD_ITEM,
} from './actionType';

const handlers = {};

const initialState = fromJS({mainMenu: []});

handlers[ADD_ITEM] = (state, action) => {
  const { key, value } = action;
  return state.push(key, value)
};

export default createReducer(initialState, handlers);
