// @flow
import { fromJS } from 'immutable';
import createReducer from '../../util/redux/createReducer';
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS
} from './actionType';

const handlers = {};

const initialState = fromJS({});

/*
 * reducers definitions
 */

handlers[LOGIN_SUCCESS] = (state, action) => state
  .updateIn(['token'], () => action.data.get('token'))

handlers[LOGIN_ERROR] = (state, action) => state
  .updateIn(['error'], () => action.error)

export default createReducer(initialState, handlers);
