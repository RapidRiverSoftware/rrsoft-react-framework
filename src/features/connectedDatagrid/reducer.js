// @flow
import { fromJS } from 'immutable';
import createReducer from 'rrrjs/lib/util/redux/createReducer';

import {
  FETCH_LIST_SUCCESS,
} from './actionType';

const handlers = {};

const initialState = fromJS({});

handlers[FETCH_LIST_SUCCESS] = (state, action) => {
  return state.set(action.originalAction.name, action.response)
}

export default createReducer(initialState, handlers);
