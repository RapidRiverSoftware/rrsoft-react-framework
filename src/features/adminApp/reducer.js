// @flow
import { fromJS } from 'immutable';
import createReducer from '../../util/redux/createReducer';

import { OPEN_MENU, CLOSE_MENU } from './actionType';

const handlers = {};

const initialState = fromJS({
  menuOpened: false,
});

/*
 * reducers definitions
 */

handlers[OPEN_MENU] = (state, action) => state.set('menuOpened', true);
handlers[CLOSE_MENU] = state => state.set('menuOpened', false);

/*
 * End of reducers definitions
 */

export default createReducer(initialState, handlers);
