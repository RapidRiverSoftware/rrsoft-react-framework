// @flow
import { fromJS } from 'immutable';
import createReducer from '../../util/redux/createReducer';

import { OPEN_MODAL, CLOSE_MODAL } from './actionType';

const handlers = {};

const initialState = fromJS({
  openedModal: undefined,
});

/*
 * reducers definitions
 */

handlers[OPEN_MODAL] = (state, action) => state.set('openedModal', action.id);
handlers[CLOSE_MODAL] = state => state.set('openedModal', undefined);

/*
 * End of reducers definitions
 */

export default createReducer(initialState, handlers);
