// @flow
import core from '../../framework/core'

import {
  DELETE_ROW,
  DELETE_ROW_SUCCESS,
} from './actionType'


const deleteRowEpic = (action$: any, store: any) =>
  action$
    .ofType(DELETE_ROW)
    .mergeMap(action => core.api.delete(`${action.url}/${action.id}`, {}, { action }))
    .map(core.api.responseToAction(DELETE_ROW_SUCCESS))
    .do(action => {
      if (!action.originalAction) { return }

      const onSuccess = action.originalAction.onSuccess
      if (onSuccess) {
        onSuccess()
      }
    })


export default [
  deleteRowEpic,
]
