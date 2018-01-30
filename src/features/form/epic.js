import core from '../../framework/core'

import {
  FETCH_SUGGESTION,
  FETCH_SUGGESTION_SUCCESS,
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


export default [ fetchSuggestionEpic ]
