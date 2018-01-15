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

      let searchTerm
      if (action.searchFields) {
        const searchArgs = [state, ...action.searchFields, ""]
        searchTerm =  formValueSelector('search').apply(null, searchArgs)
      } else {
        searchTerm = {}
      }

      return core.api.get(action.url, { ...searchTerm, currentPage: action.currentPage }, { action })
    })
    .map(core.api.responseToAction(FETCH_LIST_SUCCESS))
}

export default fetchListEpic
