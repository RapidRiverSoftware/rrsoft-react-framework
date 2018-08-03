// @flow
import { fromJS } from 'immutable';
import createReducer from 'rrrjs/lib/util/redux/createReducer';

import {
  DELETE_ROW,
  DELETE_ROW_SUCCESS,
  SHOW_ROW,
} from './actionType';

const handlers = {};

const initialState = fromJS({ fetchedData: {} });

handlers[DELETE_ROW] = (state, action) => {
  return state
    .setIn(['isDeleting'], true)
    .setIn(['connectedDatagrid', 'fetchedData', action.url], undefined)
}

handlers[DELETE_ROW_SUCCESS] = (state, action) => {
  return state.setIn(['isDeleting'], false)
}

handlers[SHOW_ROW] = (state, action) => {
  return state
    .setIn(['showRow', action.url], action.row)
    .setIn(['showRowIdx', action.url], action.ridx)
}

export default createReducer(initialState, handlers);
