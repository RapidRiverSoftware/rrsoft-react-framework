// @flow
import { fromJS } from 'immutable';
import createReducer from '../../util/redux/createReducer';
import {
  FETCH_SUGGESTION_SUCCESS,
} from './actionType';

const handlers = {};

const initialState = fromJS({
});

/*
 * reducers definitions
 */
handlers[FETCH_SUGGESTION_SUCCESS] = (state, action) => state
  .updateIn(['suggestions', action.originalAction.data.name], () => action.data)

export default createReducer(initialState, handlers);
