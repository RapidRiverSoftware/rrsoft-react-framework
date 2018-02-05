// @flow
import { fromJS } from 'immutable';
import createReducer from 'rrrjs/lib/util/redux/createReducer';

import {
  EDIT_FORM_SUCCESS,
  SAVE_EDIT,
  SAVE_EDIT_SUCCESS,
} from './actionType';

const handlers = {};

const initialState = fromJS({ fetchedData: {} });

handlers[EDIT_FORM_SUCCESS] = (state, action) => {
  return state.setIn(['fetchedData', action.originalAction.url], action.response)
}

handlers[SAVE_EDIT] = (state, action) => {
  return state.set('isSaveSuccess', false)
}

handlers[SAVE_EDIT_SUCCESS] = (state, action) => {
  return state
    .setIn(['fetchedData', action.originalAction.url], undefined)
    .set('isSaveSuccess', true)
}

export default createReducer(initialState, handlers);
