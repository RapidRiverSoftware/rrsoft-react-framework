// @flow
import core from '../../framework/core'

import {
  FETCH_LIST,
  FETCH_LIST_SUCCESS,
} from './actionType'

const fetchListEpic = (action$: any, store: any) =>
  action$
    .ofType(FETCH_LIST)
    .mergeMap(action => core.api.get(action.url, { currentPage: action.currentPage }, { action }))
    .map(core.api.responseToAction(FETCH_LIST_SUCCESS))

export default fetchListEpic
