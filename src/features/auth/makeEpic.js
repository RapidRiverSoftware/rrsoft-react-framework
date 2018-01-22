// @flow
import { apiPost, responseToAction } from '../../util/api';

import {
  LOGIN,
  LOGOUT
} from './actionType'

const makeEpic = (url) => {
  const loginEpic = (action$: any, store: any) =>
    action$
      .ofType(LOGIN)
      .mergeMap(action => apiPost(`/lala`))
      .map(responseToAction(LOGOUT));

  return loginEpic
}

export default makeEpic
