// @flow
import { fromJS, List } from 'immutable';
import createReducer from '../util/redux/createReducer';

import {
  ADD_ITEM,
} from './actionType';

const handlers = {};

const initialState = fromJS({});

handlers[ADD_ITEM] = (state, action) => {
  const { key, value } = action;
  return state.updateIn([key], arr => arr ? arr.push(value) : List())
};

export default createReducer(initialState, handlers);
