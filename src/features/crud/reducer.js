// @flow
import { fromJS } from 'immutable';
import createReducer from 'rrrjs/lib/util/redux/createReducer';

import {
  DELETE_ROW,
  DELETE_ROW_SUCCESS,
} from './actionType';

const handlers = {};

const initialState = fromJS({ fetchedData: {} });


handlers[DELETE_ROW] = (state, action) => {
  return state
    .setIn(['deleting'], true)
    .setIn(['connectedDatagrid', 'fetchedData', action.url], undefined)
}

handlers[DELETE_ROW_SUCCESS] = (state, action) => {
  return state.setIn(['deleting'], false)
}

export default createReducer(initialState, handlers);
