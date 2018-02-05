// @flow
import { fromJS } from 'immutable';
import createReducer from 'rrrjs/lib/util/redux/createReducer';

import {
  FETCH_LIST_SUCCESS,
} from './actionType';

const handlers = {};

const initialState = fromJS({ fetchedData: {} });

handlers[FETCH_LIST_SUCCESS] = (state, action) => {
  return state.setIn(['fetchedData', action.originalAction.url], action.response)
}

export default createReducer(initialState, handlers);
