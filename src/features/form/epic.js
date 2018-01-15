import core from '../../framework/core'

import {
  FETCH_SUGGESTION,
  FETCH_SUGGESTION_SUCCESS,
  FETCH_OPTION,
  FETCH_OPTION_SUCCESS,
} from './actionType'


const fetchSuggestionEpic = (action$: any) => {
  return action$
    .ofType(FETCH_SUGGESTION)
    .debounceTime(500)
    .switchMap(action => {
      return core.api.get(action.data.url, {
        term: action.data.term,
      }, {action: action})
    })
    .map(core.api.responseToAction(FETCH_SUGGESTION_SUCCESS));
}

const fetchOptionEpic = (action$: any) => {
  return action$
    .ofType(FETCH_OPTION)
    .mergeMap(action => {
      return core.api.get(action.url, {}, {action: action})
    })
    .map(core.api.responseToAction(FETCH_OPTION_SUCCESS));
}

export default [ fetchSuggestionEpic, fetchOptionEpic ]
