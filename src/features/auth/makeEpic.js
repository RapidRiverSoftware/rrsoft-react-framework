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
      .do(() => console.log("meowowwww"))
      .mergeMap(action => core.api.post(url, action.data.toJS()))
      .map(val => {
        if (val.status === 401) {
          return core.api.responseToAction(LOGIN_ERROR)(val)
        } else {
          core.storage.set('authToken', val.data.get('token'))
          core.storage.set('authName', val.data.get('name'))
          return core.api.responseToAction(LOGIN_SUCCESS)(val)
        }
      })

  return loginEpic
}

export default makeEpic
