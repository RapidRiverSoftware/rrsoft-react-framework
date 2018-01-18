// @flow
import { fromJS } from 'immutable';
import createReducer from '../core/util/createReducer';

import {
  ADD_ITEM,
} from './actionTypes';

const handlers = {};

const initialState = fromJS({});

handlers[ADD_ITEM] = (state, action) => {
  const { key, value } = action;
  return state.set(key, value)
};

const r = createReducer(initialState, handlers);
console.log(r)
export default r
