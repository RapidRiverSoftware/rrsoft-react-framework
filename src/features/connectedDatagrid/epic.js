// @flow
import core from '../../framework/core'
import { formValueSelector } from 'redux-form/immutable'

import {
  FETCH_LIST,
  FETCH_LIST_SUCCESS,
} from './actionType'

const fetchListEpic = (action$: any, store: any) => {
  return action$
    .ofType(FETCH_LIST)
    .mergeMap(action => {
      const state = store.getState()
      const searchTerm = formValueSelector('search')(state, 'url', 'something')
      return core.api.get(action.url, { ...searchTerm, currentPage: action.currentPage }, { action })
    })
    .map(core.api.responseToAction(FETCH_LIST_SUCCESS))
}

export default fetchListEpic
