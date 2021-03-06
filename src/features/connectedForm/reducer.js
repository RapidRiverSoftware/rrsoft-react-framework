// @flow
import { fromJS } from 'immutable';
import createReducer from 'rrrjs/lib/util/redux/createReducer';

import {
  EDIT_FORM_SUCCESS,
  SAVE_EDIT,
  SAVE_EDIT_SUCCESS,
  RESET_DATA,
  RESET_LOCAL_DATA,
  ADD_FORM,
  SAVE_ADD_SUCCESS
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
  return state.setIn(['fetchedData', action.originalAction.url], undefined)
}

handlers[RESET_DATA] = (state, action) => {
  return state.setIn(['fetchedData', action.url], undefined)
}

handlers[RESET_LOCAL_DATA] = (state, action) => {
  return state.setIn(['localData', action.id], undefined)
}

handlers[ADD_FORM] = (state, action) => {
  return state.setIn(['fetchedData', action.url], fromJS({}))
}

handlers[SAVE_ADD_SUCCESS] = (state, action) => {
  return state.setIn(['fetchedData', action.originalAction.url], undefined)
}

export default createReducer(initialState, handlers);
