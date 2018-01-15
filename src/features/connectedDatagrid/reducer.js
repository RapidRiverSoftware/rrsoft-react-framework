// @flow
import { fromJS } from 'immutable';
import createReducer from 'rrrjs/lib/util/redux/createReducer';

import {
  FETCH_LIST,
  FETCH_LIST_SUCCESS,
} from './actionType';

const handlers = {};

const initialState = fromJS({ fetchedData: {}, lastFetched: {} });

handlers[FETCH_LIST] = (state, action) => {
  return state
    .setIn(['lastFetched', action.url], fromJS({ currentPage: action.currentPage, searchFields: action.searchFields }))
    .setIn(['fetchedData', action.url], undefined)
}

handlers[FETCH_LIST_SUCCESS] = (state, action) => {
  return state.setIn(['fetchedData', action.originalAction.url], action.response)
}

export default createReducer(initialState, handlers);
