// @flow
import { fromJS } from 'immutable';
import createReducer from 'rrrjs/lib/util/redux/createReducer';
import type { DisplayErrorMessage } from './actions';

import { DISPLAY_ERROR_MESSAGE, CLOSE_ERROR_MESSAGE } from './actionTypes';

const handlers = {};

const initialState = fromJS({
  errorMessage: null,
});

/*
 * reducers definitions
 */

handlers[DISPLAY_ERROR_MESSAGE] = (state, action: DisplayErrorMessage) =>
  state.updateIn(['errorMessage'], () => action.message);

handlers[CLOSE_ERROR_MESSAGE] = state => state.updateIn(['errorMessage'], () => null);

/*
 * End of reducers definitions
 */

export default createReducer(initialState, handlers);
