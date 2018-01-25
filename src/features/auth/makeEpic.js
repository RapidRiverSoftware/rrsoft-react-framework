// @flow
import cookie from 'js-cookie'
import core from '../../framework/core'

import {
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  LOGIN_SUCCESS
} from './actionType'

const makeEpic = (url) => {
  const loginEpic = (action$: any, store: any) =>
    action$
      .ofType(LOGIN)
      .mergeMap(action => core.api.post(url, action.data.toJS()))
      .map(val => {
        if (val.status === 401) {
          return core.api.responseToAction(LOGIN_ERROR)(val)
        } else {
          cookie.set('authToken', val.data.get('token'), {expires: 365})
          return core.api.responseToAction(LOGIN_SUCCESS)(val)
        }
      })

  return loginEpic
}

export default makeEpic
